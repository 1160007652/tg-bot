import { Bot, Context, InputFile } from "grammy";
import { type FileFlavor, hydrateFiles } from "@grammyjs/files";

// 添加上下文调味剂
type MyContext = FileFlavor<Context>;

const bot = new Bot<MyContext>(Bun.env.BOT_TOKEN || ""); // <-- 把你的 bot token 放在 "" 之间 (https://t.me/BotFather)

// 使用插件。
bot.api.config.use(hydrateFiles(bot.token));

bot.on("message:voice", async (ctx) => {
  const voice = ctx.msg.voice;

  const duration = voice.duration; // 秒
  await ctx.reply(`你的语音消息时长 ${duration} 秒。`);

  const fileId = voice.file_id;
  await ctx.reply("你的语音消息的文件标识符是: " + fileId);

  const file = await ctx.getFile(); // 至少一小时内有效
  const path_server = file.file_path; // 文件在 Bot API 服务器内的路径

  // 下载文件到一个临时位置。
  const path_locale = await file.getUrl();
  // 打印文件路径
  console.log("File saved at ", path_server);

  await ctx.reply(
    "重新下载你的文件: " +
      `https://api.telegram.org/file/bot${Bun.env.BOT_TOKEN}/${path_server} \n ${path_locale}`
  );
});

bot.on("message", async (ctx) => {
  let photo = new InputFile(`${__dirname}/../../statics/favicon.jpg`);

  //   photo = new InputFile(new URL("https://grammy.dev/images/grammY.png"));

  //   photo = new InputFile({ url: "https://grammy.dev/images/grammY.png" }); // 等价的写法

  await bot.api.sendPhoto(ctx.chatId, photo, {
    caption: "favicon.jpg",
  });
});

bot.start();
