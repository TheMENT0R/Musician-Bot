module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {
      member.send("�ncelikle Bir Ses Kanal�nda Olmal�s�n!").catch(console.error);
      return false;
    }

    return true;
  }
};
