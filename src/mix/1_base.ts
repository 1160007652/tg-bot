import { Bot } from "grammy";

const bot = new Bot(Bun.env.BOT_TOKEN); // <-- 把你的 bot token 放在 "" 之间 (https://t.me/BotFather)

// 用"你好！"来回复任意信息
bot.on("message:text", (ctx) => {
  ctx.reply("你好, TG 开发者");

  //   ctx.message.text;
});

bot.on("message:photo", (ctx) => ctx.reply("图片还不错，也就一般般"));

bot.start();
