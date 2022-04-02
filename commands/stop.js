const { canModifyQueue } = require("../util/MusicianUtil");


module.exports = {
  name: "stop",
  description: "Muzigi Durdurur.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("Çalınan Müzik Yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ Müziği Durdurdu!`).catch(console.error);
  }
};
