const { canModifyQueue } = require("../util/MusicianUtil");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Calınan Muzigi Atlar.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("Müzik Çalmadığı İçin Bunu Yapamam.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ Şarkıyı Geçti`).catch(console.error);
  }
};
