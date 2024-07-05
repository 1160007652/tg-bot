import { Bot } from "grammy";
import { Menu, MenuRange } from "@grammyjs/menu";
import { generateMnemonic, english, mnemonicToAccount } from "viem/accounts";

// 创建一个 bot。
const bot = new Bot(Bun.env.BOT_TOKEN);

const mnemonic = generateMnemonic(english);
const walletList = [1, 2, 3, 4, 5].map((item) =>
  mnemonicToAccount(mnemonic, { accountIndex: item })
);

const main = new Menu("root-menu")
  .text("Welcome", (ctx) => ctx.reply("Hi!"))
  .row()
  .submenu("Select Wallet", "wallet-menu");

const settings = new Menu("wallet-menu")
  .dynamic(() => {
    // 动态生成一部分菜单！
    const range = new MenuRange();

    walletList.forEach((item) => {
      range
        .text(item.address, (ctx) =>
          ctx.reply(`You chose ${item.address} wallet`)
        )
        .row();
    });

    return range;
  })
  .text("Cancel", (ctx) => ctx.deleteMessage())
  .back("Go Back");

main.register(settings);

// 使其具有互动性。
bot.use(main);

bot.command("start", async (ctx) => {
  // 发送菜单。
  await ctx.reply("Check out this menu:", { reply_markup: main });
});

bot.start();
