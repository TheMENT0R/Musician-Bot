/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();


/**
 * Client Events
 */
client.on("ready", () => {

    console.log(`${client.user.username} Hazir!`);
    console.log(`${client.user.username} Prefix is "." `);
    
  client.user.setActivity(`${PREFIX}help`);
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

client.on('guildMemberAdd', async (member, guild, message) => {

    let role = await db.fetch(`otorolisim_${member.guild.id}`)
    if (!otorol || otorol.toLowerCase() === 'yok') return;
    else {
        try {

            if (!i) return

            member.addRole(member.guild.roles.get(otorol))
                .setDescription(`**Sunucuya Yeni Kat�lan** \`${member.user.tag}\` **Kullan�c�s�na** \`${role}\` **Rol� verildi.**`)
                .setColor('0x36393E')
                .setFooter(`Sadis BOT Otorol Sistemi`)
            member.guild.channels.get(i).send(embed)
        } catch (e) {
            console.log(e)
        }
    }

});

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error executing that command.").catch(console.error);
    }
  }
});
