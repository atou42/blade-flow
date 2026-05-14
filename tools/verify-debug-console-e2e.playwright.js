async (page) => {
await page.setViewportSize({ width: 390, height: 844 });
const consoleIssues = [];
page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) consoleIssues.push(`${message.type()}: ${message.text()}`);
});
page.on("pageerror", (error) => consoleIssues.push(`pageerror: ${error.message}`));

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

await page.evaluate(() => localStorage.clear());
await page.goto("http://127.0.0.1:4173/?debug=1&e2e=debug-console", { waitUntil: "networkidle" });

await page.click("[data-open-tuner]");
await page.waitForSelector(".debug-console-panel");
assert((await page.textContent(".debug-console-panel")).includes("Boss 调试台"), "debug console did not open");

await page.click('[data-debug-boss="redline-rival"]');
const setRange = async (path, value) => {
  await page.evaluate(
    ({ path, value }) => {
      const input = document.querySelector(`[data-debug-tune="${path}"]`);
      if (!input) throw new Error(`missing control ${path}`);
      input.value = String(value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    },
    { path, value },
  );
};
await setRange("boss.hpScale", 1.45);
await setRange("boss.bossTempo", 1.25);
await setRange("player.cardIntervalMs", 620);
await setRange("player.recoveryScale", 1.25);

await page.click('[data-debug-tab="growth"]');
await page.selectOption("[data-debug-growth]", "act2-standard");
await page.click('[data-debug-tab="export"]');

const exported = await page.$eval("[data-debug-export-text]", (element) => element.value);
const parsed = JSON.parse(exported);
assert(parsed.schema === "blade-flow.debug-boss-tuning.v1", "wrong export schema");
assert(parsed.target.bossId === "redline-rival", "wrong exported boss");
assert(parsed.playerBuild.growthStage === "act2-standard", "wrong exported growth");
assert(parsed.tuning.boss.hpScale === 1.45, "hp scale did not export");
assert(parsed.tuning.boss.bossTempo === 1.25, "boss tempo did not export");
assert(parsed.tuning.player.cardIntervalMs === 620, "card interval did not export");
assert(parsed.tuning.player.recoveryScale === 1.25, "recovery scale did not export");

await page.click("[data-debug-save-preset]");
await page.click("[data-debug-start]");
await page.waitForFunction(() => window.__bladeFlowDebug?.debugBossState?.().debugRun === true, null, { timeout: 10000 });
const state = await page.evaluate(() => window.__bladeFlowDebug.debugBossState());
assert(state.room === "赤线宿敌", `wrong room ${state.room}`);
assert(state.act === 2 && state.encounterIndex === 7, "wrong boss direct index");
assert(state.rewardNames.some((name) => name.includes("成长包")), "growth pack was not applied");
assert(state.tuning.enemyHp === 1.45, "hp tuning was not applied");
assert(state.tuning.bossTempo === 1.25, "tempo tuning was not applied");
assert(state.cardIntervalMs === 620, "card interval was not applied");
assert(state.recoveryScale === 1.25, "recovery scale was not applied");

await page.click("#tunerButton");
await page.waitForSelector(".debug-drawer-panel");
const drawerText = await page.textContent(".debug-drawer-panel");
assert(drawerText.includes("调试战") && drawerText.includes("赤线宿敌"), "debug drawer mismatch");
await page.click("[data-debug-drawer-console]");
await page.waitForSelector(".debug-console-panel");
assert((await page.textContent(".debug-console-panel")).includes("Boss 调试台"), "console did not reopen from drawer");

await page.evaluate((text) => {
  localStorage.clear();
  window.__bladeFlowDebug.debugBossImport(text);
}, exported);
const imported = await page.evaluate(() => JSON.parse(window.__bladeFlowDebug.debugBossExport()));
assert(imported.target.bossId === "redline-rival", "imported boss mismatch");
assert(imported.tuning.player.cardIntervalMs === 620, "imported interval mismatch");

const invalidResults = await page.evaluate(() => {
  const attempts = [
    { schema: "bad", target: { act: 2, bossId: "redline-rival", encounterKind: "boss" }, playerBuild: {}, tuning: {} },
    { schema: "blade-flow.debug-boss-tuning.v1", target: { act: 9, bossId: "missing", encounterKind: "boss" }, playerBuild: {}, tuning: {} },
    { schema: "blade-flow.debug-boss-tuning.v1", target: { act: 2, bossId: "redline-rival", encounterKind: "boss" }, playerBuild: { equipmentId: "storm-katana", growthStage: "act2-standard", enabledRewards: ["missing-reward"], openingHand: [], seed: "bad" }, tuning: { boss: { hpScale: 1, bossTempo: 1, damageScale: 1 }, player: { focus: 100, damageScale: 1, cardIntervalMs: 0, recoveryScale: 1 }, windows: { perfectWindow: 760 }, rewards: { rewardPower: 1 }, ai: { pressure: 7, repeatAdapt: 10 } } },
  ];
  return attempts.map((item) => {
    try {
      window.__bladeFlowDebug.debugBossValidate(item);
      return "accepted";
    } catch (error) {
      return error.message;
    }
  });
});
assert(invalidResults.every((result) => result !== "accepted"), `invalid config accepted: ${invalidResults.join(" | ")}`);

await page.evaluate((text) => window.__bladeFlowDebug.startDebugBoss(JSON.parse(text)), exported);
await page.waitForFunction(() => window.__bladeFlowDebug.debugBossState().debugRun === true);
await page.evaluate(() => window.__bladeFlowDebug.forceBossDeath());
await page.waitForSelector(".debug-result-panel", { timeout: 10000 });
const resultText = await page.textContent(".debug-result-panel");
assert(resultText.includes("调试战胜利"), "debug result overlay missing");
const profileKeys = await page.evaluate(() => ({
  real: localStorage.getItem("blade-flow-profile-v1"),
  debug: localStorage.getItem("blade-flow-debug-profile-v1"),
  mode: localStorage.getItem("blade-flow-profile-mode-v1"),
  results: localStorage.getItem("blade-flow-debug-boss-results-v1"),
}));
assert(!profileKeys.real && !profileKeys.debug && !profileKeys.mode, "debug boss run polluted profile storage");
assert(profileKeys.results, "debug result was not stored in debug namespace");

const bottomGap = await page.evaluate(() => {
  const panel = document.querySelector(".debug-result-panel");
  const rect = panel.getBoundingClientRect();
  return Math.round(window.innerHeight - rect.bottom);
});
assert(bottomGap >= 8, `debug panel too close to bottom: ${bottomGap}`);

return {
  ok: true,
  exported: {
    boss: parsed.target.bossId,
    growth: parsed.playerBuild.growthStage,
    hpScale: parsed.tuning.boss.hpScale,
    cardIntervalMs: parsed.tuning.player.cardIntervalMs,
    recoveryScale: parsed.tuning.player.recoveryScale,
  },
  state: {
    room: state.room,
    act: state.act,
    rewardNames: state.rewardNames.slice(0, 5),
    cardIntervalMs: state.cardIntervalMs,
    recoveryScale: state.recoveryScale,
  },
  invalidResults,
  bottomGap,
  consoleIssues,
};
}
