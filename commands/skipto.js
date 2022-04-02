const { canModifyQueue } = require("../util/MusicianUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Sirada Secilen Muzige Gecis Yapar.",
  execute(message, args) {
    if (!args.length) return message.reply(`Kullanim: ${message.client.prefix}${module.exports.name} <Sira Numarasi>`);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Sıra Yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.songs = queue.songs.slice(args[0] - 2);
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ Atlattı ${args[0] - 1} Şarkıya`).catch(console.error);
  }
};
