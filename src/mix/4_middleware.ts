import { Bot, Context, type NextFunction } from "grammy";

const bot = new Bot(Bun.env.BOT_TOKEN); // <-- 把你的 bot token 放在 "" 之间 (https://t.me/BotFather)

/** 统计 bot 的响应时间，并将其记录到 `console`。 */
async function responseTime(
  ctx: Context,
  next: NextFunction // 这是 `() => Promise<void>` 的一个别名
): Promise<void> {
  // 开始计时
  const before = Date.now(); // 毫秒
  // 调用下游的中间件
  await next(); // 请务必使用 `await`！
  // 停止计时
  const after = Date.now(); // 毫秒
  // 打印时间差
  console.log(`Response time: ${after - before} ms`);
}

bot.use(responseTime);

// 响应 /start 命令。
bot.on("message", (ctx) => {
  ctx.reply("start");
});

bot.start();
