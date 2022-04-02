const { canModifyQueue } = require("../util/MusicianUtil");

module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Tekrari Ac/Kapat.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Çalýnan Müzik Bulunamadý.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Muzik Tekrari ${queue.loop ? "**Acik**" : "**Kapali**"}`)
      .catch(console.error);
  }
};
