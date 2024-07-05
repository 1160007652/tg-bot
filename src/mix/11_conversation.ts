import { Bot, Context, session, type SessionFlavor } from "grammy";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import { getAddress } from "viem";

interface SessionData {
  msgCount: number;
}

function initial(): SessionData {
  return { msgCount: 0 };
}

type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

const bot = new Bot<MyContext>(Bun.env.BOT_TOKEN);

/** 定义对话 */
async function greeting(conversation: MyConversation, ctx: MyContext) {
  // 向用户询问他们的家庭住址
  await ctx.reply("请输入待监听的池子地址");

  // 等待用户发送 池子地址
  const poolAddress = await conversation.wait();

  if (poolAddress.msg?.text) {
    await ctx.reply(`正在监听此池子, ${poolAddress.msg?.text}`);
  }

  //   结束会话
  //   await ctx.conversation.exit();

  return; // 结束会话
}

bot.use(session({ initial }));
bot.use(conversations());
bot.use(createConversation(greeting));

bot.command("start", async (ctx) => {
  await ctx.conversation.enter("greeting");
});

bot.start();
