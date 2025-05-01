const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (interaction) => {
  if (!interaction.inGuild()) return;

  try {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("confirm_apply")
        .setLabel("✅ Evet")
        .setStyle(ButtonStyle.Success) 
    );

    await interaction.user.send({
      content: "**Yetkili ekibimize katılmak ister misiniz?**",
      components: [row]
    });
    await interaction.reply({ content: "Başvuru formu DM olarak gönderildi!", ephemeral: true }); // Ephemeral Sadece butona basan kişinin görebildiği bir mesajı 
    // aktif eder yandaki true yu false yaparsanız Sunucudaki herkes o mesajı görür  zypheris den bir sike yaramayacak bilgiler

  } catch (err) {
    await interaction.reply({ content: "DM gönderilemedi. Lütfen DM'lerinizi açın.", ephemeral: true });
  }
};
