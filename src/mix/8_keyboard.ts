import { Bot, InlineKeyboard, Keyboard } from "grammy";

const bot = new Bot(Bun.env.BOT_TOKEN); // <-- 把你的 bot token 放在 "" 之间 (https://t.me/BotFather)

// --- 消息按钮
const inlineKeyboard = new InlineKeyboard()
  .text("qq", "qq")
  .text("gmail", "gmail")
  .text("163", "163");

bot.on("message:entities:email", (ctx) => {
  ctx.reply("这是什么邮箱", { reply_markup: inlineKeyboard });
});

// 等待具有特定回调数据的点击事件。 eg: hi
bot.callbackQuery("gmail", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "Gmail-2!",
  });
});

// 监听所有的回调点击事件
bot.on("callback_query:data", async (ctx) => {
  await ctx.answerCallbackQuery({ text: ctx.callbackQuery.data }); // 移除加载动画
});

// --- 键盘按钮

const keyboard = new Keyboard()
  .text("google")
  .text("baidu")
  .row()
  .text("unkown. 😈")
  .resized() // 自定义 Keyboard 大小
  .oneTime() // 按钮第一次被按下后立即隐藏自定义 keyboard
  .placeholder("选择你输入的搜索引擎!"); // 会在发送消息的输入框中，显示此文本

bot.on("message:entities:url", (ctx) => {
  ctx.reply("这是什么邮箱", { reply_markup: keyboard });
});

bot.start();
