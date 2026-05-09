#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const allowedHeat = new Set(["冷", "温", "热", "烫"]);
const allowedFeel = new Set(["顺滑", "偶发卡顿", "明显卡顿", "不可接受"]);

function fail(message, details = {}) {
  console.error(JSON.stringify({ verdict: "FAIL", message, ...details }, null, 2));
  process.exit(1);
}

function readInput(inputPath) {
  if (inputPath && inputPath !== "-") return fs.readFileSync(inputPath, "utf8");
  return fs.readFileSync(0, "utf8");
}

function parseArgs(argv) {
  const args = [...argv];
  let inputPath = "-";
  let markdownOut = "";
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--markdown-out") {
      markdownOut = args[index + 1] ?? "";
      index += 1;
      continue;
    }
    if (value.startsWith("--")) {
      fail("未知参数。", { arg: value });
    }
    inputPath = value;
  }
  if (markdownOut.trim() === "") markdownOut = "";
  return { inputPath, markdownOut };
}

function parseJson(raw) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    fail("输入不是合法 JSON。", { error: error.message });
  }
}

function requireString(record, key) {
  const value = record[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${key} 缺失或不是非空字符串。`, { key, value });
  }
  return value.trim();
}

function requireNumber(record, key) {
  const value = record[key];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    fail(`${key} 缺失或不是有效数字。`, { key, value });
  }
  return value;
}

function requireObject(record, key) {
  const value = record[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${key} 缺失或不是对象。`, { key, value });
  }
  return value;
}

function versionNumber(version) {
  const match = /^v0\.2\.(\d+)$/.exec(version);
  return match ? Number(match[1]) : null;
}

function validateClient(record, minor) {
  if (minor < 54) return null;
  const client = requireObject(record, "client");
  const userAgent = requireString(client, "userAgent");
  const mobileUa = /iphone|ipod|ipad|android.*mobile|mobile safari/i.test(userAgent);
  if (!mobileUa || /playwright|headless|windows nt|x11/i.test(userAgent)) {
    fail("client.userAgent 不像真实手机浏览器。", { userAgent });
  }
  const maxTouchPoints = requireNumber(client, "maxTouchPoints");
  if (maxTouchPoints < 1) {
    fail("client.maxTouchPoints 没有触控信息。", { maxTouchPoints });
  }
  const viewport = requireObject(client, "viewport");
  const viewportWidth = requireNumber(viewport, "width");
  const viewportHeight = requireNumber(viewport, "height");
  if (viewportWidth < 280 || viewportWidth > 720 || viewportHeight < 500) {
    fail("client.viewport 不像竖屏手机视口。", { viewport });
  }
  return {
    userAgent,
    maxTouchPoints,
    viewportWidth,
    viewportHeight,
  };
}

function validate(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    fail("根对象必须是单条真机验收记录。");
  }

  const kind = requireString(record, "kind");
  if (kind !== "Blade Flow mobile acceptance") {
    fail("kind 不匹配。", { kind });
  }

  const version = requireString(record, "version");
  const minor = versionNumber(version);
  if (minor === null || minor < 46) {
    fail("version 不属于支持真机验收的版本。", { version });
  }
  const clientSummary = validateClient(record, minor);

  const savedAt = requireString(record, "savedAt");
  if (Number.isNaN(Date.parse(savedAt))) {
    fail("savedAt 不是有效时间。", { savedAt });
  }

  const device = requireString(record, "device");
  const suspiciousDevice = /viewport|playwright|desktop|local|live mobile|模拟|emulat/i.test(device);
  if (suspiciousDevice || device === "iPhone / Android / 浏览器") {
    fail("device 看起来不是一台真实手机。", { device });
  }

  const heat = requireString(record, "heat");
  if (!allowedHeat.has(heat)) {
    fail("heat 必须是 冷、温、热、烫 之一。", { heat });
  }

  const feel = requireString(record, "feel");
  if (!allowedFeel.has(feel)) {
    fail("feel 必须是 顺滑、偶发卡顿、明显卡顿、不可接受 之一。", { feel });
  }

  const probe = record.probe;
  if (!probe || typeof probe !== "object" || Array.isArray(probe)) {
    fail("probe 缺失或不是对象。", { probe });
  }

  const duration = requireNumber(probe, "duration");
  if (duration < 59000) {
    fail("长测时长不足 60 秒。", { duration });
  }

  const actions = requireNumber(probe, "actions");
  if (actions <= 0) {
    fail("长测没有实际出招。", { actions });
  }

  const longTasks = requireNumber(probe, "longTasks");
  if (longTasks < 0) {
    fail("longTasks 不能为负数。", { longTasks });
  }

  const slashNodes = requireNumber(probe, "slashNodes");
  const impactNodes = requireNumber(probe, "impactNodes");
  const comboNodes = requireNumber(probe, "comboNodes");
  const leftoverNodes = slashNodes + impactNodes + comboNodes;
  if (leftoverNodes > 12) {
    fail("长测后特效残留节点过多。", { slashNodes, impactNodes, comboNodes, leftoverNodes });
  }

  return {
    version,
    savedAt,
    device,
    heat,
    feel,
    duration,
    actions,
    longTasks,
    slashNodes,
    impactNodes,
    comboNodes,
    client: clientSummary,
  };
}

function buildMarkdown(record, summary) {
  return `# 最终真机验收记录

结论：PASS。这条 JSON 通过 \`tools/validate-mobile-acceptance.mjs\` 校验，可以作为 completion audit 的真实手机证据。

## 记录摘要

| 字段 | 值 |
| --- | --- |
| version | ${summary.version} |
| savedAt | ${summary.savedAt} |
| device | ${summary.device} |
| heat | ${summary.heat} |
| feel | ${summary.feel} |
| duration | ${summary.duration} ms |
| actions | ${summary.actions} |
| longTasks | ${summary.longTasks} |
| slash/impact/combo residue | ${summary.slashNodes}/${summary.impactNodes}/${summary.comboNodes} |
${summary.client ? `| client viewport | ${summary.client.viewportWidth}x${summary.client.viewportHeight} |
| client touch points | ${summary.client.maxTouchPoints} |
| client UA | ${summary.client.userAgent} |
` : ""}

## 原始 JSON

\`\`\`json
${JSON.stringify(record, null, 2)}
\`\`\`

## 后续动作

把本文档纳入最终 completion audit，并重新检查 \`docs/roadmap/remaining-spec-high-standard-goal.md\` 的所有剩余项。
`;
}

const { inputPath, markdownOut } = parseArgs(process.argv.slice(2));
const raw = readInput(inputPath);
const record = parseJson(raw);
const summary = validate(record);
if (markdownOut) {
  fs.mkdirSync(path.dirname(markdownOut), { recursive: true });
  fs.writeFileSync(markdownOut, buildMarkdown(record, summary));
}
console.log(
  JSON.stringify(
    {
      verdict: "PASS",
      message: "真机验收记录可以作为最终 completion 审计证据。",
      summary,
      markdownOut: markdownOut || null,
    },
    null,
    2,
  ),
);
