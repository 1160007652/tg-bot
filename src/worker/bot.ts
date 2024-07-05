import { Bot } from "grammy";
import { distribute, run } from "@grammyjs/runner";

const bot = new Bot(Bun.env.BOT_TOKEN || ""); // <-- 把你的 bot token 放在 "" 之间 (https://t.me/BotFather)

// 所有的消息中间件，都会通知开启多线程
// bot.use(distribute(__dirname + "/worker", { count: 4 })); // 默认开启 4 个线程

// 只有 文本中包含url链接的消息，开启多线程加持

// 邮箱内容不会开启多线程
bot.on("message:entities:email", (ctx) => {
  ctx.reply("正确的email");
});

bot.on(
  ["message:entities:url"],
  distribute(__dirname + "/worker", { count: 8 })
);

// 使用多线程并发运行。
run(bot);
