const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require("../config.json");

module.exports = async (interaction) => {
  const user = interaction.user;

  try {
    const dmChannel = await user.createDM();

    const sorular = [
      "Adınız nedir?",
      "Kaç yaşındasınız?",
      "Neden yetkili olmak istiyorsunuz?",
      "Ne kadar aktif olabilirsiniz?",
      "Daha önce yetkili oldunuz mu?",
      "Sunucuyu geliştirmek için fikriniz var mı?"
    ];

    let cevaplar = [];
    const filter = m => m.author.id === user.id;

    for (const soru of sorular) {
      await dmChannel.send(soru);
      const collected = await dmChannel.awaitMessages({ filter, max: 1, time: 120_000 });
      if (!collected.first()) {
        return dmChannel.send("⏱ Zaman aşımı nedeniyle başvuru iptal edildi.");
      }
      cevaplar.push(collected.first().content);
    }
    const embed = new EmbedBuilder()
      .setTitle(" Yeni Başvuru")
      .setColor("Blue")
      .setFooter({ text: `Başvuran: ${user.tag}`, iconURL: user.displayAvatarURL() }) 
      .setTimestamp()
      .setThumbnail(user.displayAvatarURL());

    for (let i = 0; i < sorular.length; i++) {
      embed.addFields({ name: sorular[i], value: cevaplar[i] });
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`onayla_${user.id}`)
        .setLabel(" Onayla")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`reddet_${user.id}`)
        .setLabel(" Reddet")
        .setStyle(ButtonStyle.Danger)
    );

    const kanal = interaction.client.channels.cache.get(config.zypid);
    if (!kanal) return dmChannel.send("<a:zypred:1367460426660446258> Başvuru kanalı bulunamadı. Lütfen bot sahibine bildir.");

    await kanal.send({ embeds: [embed], components: [row] });

    await dmChannel.send("<a:zyponay:1367460361321844777> Başvurun başarıyla gönderildi. Yetkililer seninle iletişime geçecek.");
  } catch (err) {
    console.error("Başvuru sırasında hata:", err);
    try {
      await interaction.reply({ content: "<a:zypred:1367460426660446258> Başvuruda bir hata oluştu.", ephemeral: true });
    } catch (_) {}
  }
};
