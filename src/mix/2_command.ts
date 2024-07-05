import { Bot } from "grammy";

const bot = new Bot(Bun.env.BOT_TOKEN); // <-- 把你的 bot token 放在 "" 之间 (https://t.me/BotFather)

// 响应 /start 命令。
bot.command("start", (ctx) => {
  ctx.reply("start");
  console.log(ctx.match);
});

// 响应 /help 命令。
bot.command("help", (ctx) => {
  ctx.reply("help");
});

// 在Tg聊天窗口中，显示推荐命令 ， * 需要删除会话，重新使用TG-bot 才会出现
await bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Show help text" },
]);

/**
 * 知识，推荐系统方案
 *
 * 格式:
 * https://t.me/<bot name>?start=<消息内容>
 *
 * 例子:
 * https://t.me/learn_001_bot?start=jincong
 *
 * https://t.me/learn_001_bot?start=shiyu
 */

bot.start();
