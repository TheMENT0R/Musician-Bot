module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {
      member.send("Öncelikle Bir Ses Kanalýnda Olmalýsýn!").catch(console.error);
      return false;
    }

    return true;
  }
};
