import { Bot, Context, session, type SessionFlavor } from "grammy";

// 会话内容 结构体
interface SessionData {
  msgCount: number;
}

// 安装会话中间件，并定义会话初始值。
function initial(): SessionData {
  return { msgCount: 0 };
}

type MyContext = Context & SessionFlavor<SessionData>;

const bot = new Bot<MyContext>(Bun.env.BOT_TOKEN);

bot.use(session({ initial }));

bot.command("msgcount", async (ctx) => {
  const count = ctx.session.msgCount;
  await ctx.reply(`Your hunger level is ${count}!`);
});

bot.on("message", async (ctx) => {
  ctx.session.msgCount++;
});

bot.start();
