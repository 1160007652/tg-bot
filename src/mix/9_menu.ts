import { Bot } from "grammy";
import { Menu, MenuRange } from "@grammyjs/menu";

// 创建一个 bot。
const bot = new Bot(Bun.env.BOT_TOKEN);

// 创建一个简单的菜单。
// const menu = new Menu("my-menu-identifier")
//   .text("A", (ctx) => ctx.reply("You pressed A!"))
//   .row()
//   .url("google.com", "https://www.google.com")
//   .row()
//   .webApp("webapp", "https://www.google.com")
//   .row()
//   .switchInline("inline", "my-query")
//   .switchInlineCurrent("inline-current", "my-query-current");

// 动态按钮标题
// const menu = new Menu("greet-me").text(
//   (ctx) => `Greet ${ctx.from?.first_name ?? "me"}!`, // 动态标签
//   (ctx) => ctx.reply(`Hello ${ctx.from.first_name}!`) // 处理函数
// );

// 更新按钮标题
// const menu = new Menu("time", { onMenuOutdated: false }).text(
//   () => new Date().toLocaleString(), // 按钮标签为当前时间
//   (ctx) => ctx.menu.update() // 点击按钮时更新时间
// );

// 更新文字消息
const menu = new Menu("time").text("What's the time?", (ctx) =>
  ctx.editMessageText("It is" + new Date().toLocaleString())
);

// const menu = new Menu("dynamic")
//   .dynamic(() => {
//     // 动态生成一部分菜单！
//     const range = new MenuRange();
//     for (let i = 0; i < 3; i++) {
//       range.text(i.toString(), (ctx) => ctx.reply(`You chose ${i}`)).row();
//     }
//     return range;
//   })
//   .text("Cancel", (ctx) => ctx.deleteMessage());

// 使其具有互动性。
bot.use(menu);

bot.command("start", async (ctx) => {
  // 发送菜单。
  await ctx.reply("Check out this menu:", { reply_markup: menu });
});

bot.inlineQuery("my-menu-identifier", (ctx) => {
  console.log(ctx.match);
  ctx.reply(ctx.inlineQuery.query);
});

bot.start();
