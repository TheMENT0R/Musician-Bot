const fs = require("fs");
const config = require("../config.json");

module.exports = {
  name: "pruning",
  description: "Bot Mesajlarini Ac/Kapat",
  execute(message) {
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("Dosya Okunurken Sorun Oluþtu.").catch(console.error);
      }

      return message.channel
        .send(`Message pruning is ${config.PRUNING ? "**enabled**" : "**disabled**"}`)
        .catch(console.error);
    });
  }
};
