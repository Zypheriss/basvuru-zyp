const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages],
  partials: ['CHANNEL']
});

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (command) await command.execute(interaction, client);
  }

  if (interaction.isButton()) {
    const buttonId = interaction.customId;
    if (buttonId === "apply_button") {
      require("./interactions/applicationButton")(interaction, client);
    } else if (buttonId.startsWith("onayla_") || buttonId.startsWith("reddet_")) {
      require("./interactions/approveReject")(interaction, client);
    } else if (buttonId === "confirm_apply" || buttonId === "deny_apply") {
      require("./interactions/formHandler")(interaction, client);
    }
  }
});

client.login(config.token);
