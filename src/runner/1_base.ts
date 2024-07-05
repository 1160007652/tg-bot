import { Bot } from "grammy";
import { run } from "@grammyjs/runner";

const bot = new Bot(Bun.env.BOT_TOKEN || ""); // <-- 把你的 bot token 放在 "" 之间 (https://t.me/BotFather)

// 添加常见的中间件，bala bala
bot.on("message", (ctx) => ctx.reply("Got your message."));

// 并发运行 bot！
run(bot);
