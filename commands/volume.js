const { canModifyQueue } = require("../util/MusicianUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Muzik Sesini Ayarlar.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Çalınan Müzik Yok.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Öncelikle Bir Kanala Girmelisin!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Şuanki Ses Seviyesi: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Lütfen Bir Sayı Belirtiniz.").catch(console.error);
    if (parseInt(args[0]) > 150 || parseInt(args[0]) < 0)
      return message.reply("Litfen 0 - 150 Arasında Sayı Giriniz.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 150);

    return queue.textChannel.send(`Ses Ayarlandı: **${args[0]}%**`).catch(console.error);
  }
};
