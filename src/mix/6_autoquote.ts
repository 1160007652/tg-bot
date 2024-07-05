import { Bot } from "grammy";
import { addReplyParam, autoQuote } from "@roziscoding/grammy-autoquote";

const bot = new Bot(Bun.env.BOT_TOKEN || "");

bot.on("message", async (ctx) => {
  ctx.api.config.use(addReplyParam(ctx));
  await ctx.reply("Demo command!"); // 这将会引用用户的消息
});

// bot.use(autoQuote());

// bot.on("message", async (ctx) => {
//   await ctx.reply("Demo command!"); // 这将会引用用户的消息
// });

// bot.command("hello", async (ctx) => {
//   await ctx.reply("Hi there :)"); // 这也会引用用户的消息
// });

bot.start();
