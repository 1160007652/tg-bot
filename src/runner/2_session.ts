import { Bot } from "grammy";
import { run, sequentialize } from "@grammyjs/runner";

const bot = new Bot(Bun.env.BOT_TOKEN || ""); // <-- 把你的 bot token 放在 "" 之间 (https://t.me/BotFather)

bot.use(
  sequentialize((ctx) => {
    const chat = ctx.chat?.id.toString();
    const user = ctx.from?.id.toString();
    return [chat, user].filter((con) => con !== undefined);
  })
);

// 添加常见的中间件，bala bala
bot.on("message", (ctx) => ctx.reply("Got your message."));

// 并发运行 bot！
const handle = run(bot);

// 优雅结束
handle.task()?.then(() => {
  console.log("Bot done processing!");
});
