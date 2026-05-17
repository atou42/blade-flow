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

await page.goto("http://127.0.0.1:4185/?bossLab=1", { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });
await page.waitForSelector(".debug-console-panel");

assert((await page.textContent(".debug-console-head span")) === "Boss 实验战", "boss lab did not open");
assert((await page.locator("[data-debug-experiment]").count()) === 4, "wrong experiment preset count");

await page.click('[data-debug-experiment="storm-card-survival"]');
assert((await page.textContent(".debug-console-message")).includes("回血护盾"), "experiment preset did not apply");

await page.click("[data-debug-start]");
await page.waitForFunction(() => window.__bladeFlowDebug?.debugBossState?.().debugRun === true, null, { timeout: 10000 });
const started = await page.evaluate(() => window.__bladeFlowDebug.debugBossState());
assert(started.room === "风暴队长", `wrong room ${started.room}`);
assert(started.act === 1, `wrong act ${started.act}`);
assert(started.stats.config.playerBuild.openingHand.join(",") === "guard,shadow-step,breaker,quick-slash", "wrong opening hand");

await page.evaluate(() => window.__bladeFlowDebug.forceBossDeath());
await page.waitForSelector(".debug-result-panel");
assert((await page.textContent(".debug-result-panel h2")).includes("实验战胜利"), "result panel did not show lab victory");
assert((await page.textContent(".debug-result-panel")).includes("首次受击"), "result panel missed first hit summary");

await page.click("[data-debug-result-console]");
await page.waitForSelector(".debug-console-panel");
await page.click('[data-debug-tab="export"]');
const recentText = await page.locator(".debug-console-section", { hasText: "最近结果" }).innerText();
assert(recentText.includes("胜"), "recent result comparison did not include win");
assert(consoleIssues.length === 0, `console issues: ${consoleIssues.join("\\n")}`);
await page.screenshot({ path: "output/boss-lab-e2e.png", fullPage: true });

return { ok: true, consoleIssues };
};
