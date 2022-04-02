const { canModifyQueue } = require("../util/MusicianUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Muzigi Devam Ettirir.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Çalınan Müzik Yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ Müziği Devam Ettirdi!`).catch(console.error);
    }

    return message.reply("Çalma Listesi Durdurulamadı.").catch(console.error);
  }
};
