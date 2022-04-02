const { canModifyQueue } = require("../util/MusicianUtil");

module.exports = {
  name: "pause",
  description: "Calinan Musigi Durdurur.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
      if (!queue) return message.reply("Çalınan Müzik Bulunamadı.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ Müziği Durdurdu.`).catch(console.error);
    }
  }
};
