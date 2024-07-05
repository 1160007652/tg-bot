import { Bot, GrammyError, HttpError } from "grammy";

const bot = new Bot(Bun.env.BOT_TOKEN || ""); // <-- 把你的 bot token 放在 "" 之间 (https://t.me/BotFather)

bot.on("message:text", (ctx) => {
  throw "111";
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
