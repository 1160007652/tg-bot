// worker.ts
import { BotWorker } from "@grammyjs/runner";

// 创建一个新的 bot worker。
const bot = new BotWorker(Bun.env.BOT_TOKEN || "");

// 添加消息处理逻辑。
bot.on("message", (ctx) => ctx.reply("yay!"));
