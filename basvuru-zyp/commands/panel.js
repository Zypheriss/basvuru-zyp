const { SlashCommandBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Başvuru panelini gönderir.")
    .addChannelOption(option =>
      option.setName("kanal")
        .setDescription("Başvuru panelinin gideceği kanal")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),

  async execute(interaction) {
    const kanal = interaction.options.getChannel("kanal");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("apply_button")
        .setLabel("Başvur")
        .setStyle(ButtonStyle.Success)
    );

    await kanal.send({
      content: "**Yetkili ekibimize katılmak için aşağıdaki butona tıklayın!**",
      components: [row]
    });

    await interaction.reply({ content: "<a:sasknzyp:1367460513419759767> Kullanıcıların basvuıru yapacağı paneli yolladım kanki", ephemeral: true });
  }
};
