const { EmbedBuilder } = require('discord.js');
const config = require("../config.json");

module.exports = async (interaction) => {
  const member = await interaction.guild.members.fetch(interaction.user.id);

  if (!member.roles.cache.has(config.yetkiliRolId)) {
    return interaction.reply({ content: "<a:zypred:1367460426660446258> Bu işlemi yapmaya yetkin yok.", ephemeral: true });
  }

  const userId = interaction.customId.split("_")[1];
  const target = await interaction.guild.members.fetch(userId).catch(() => null);

  if (!target) {
    return interaction.reply({ content: "Kullanıcı bulunamadı veya sunucuda değil.", ephemeral: true });
  }

  if (interaction.customId.startsWith("onayla_")) {
    await target.roles.add(config.zyponayid).catch(() => null);
    await target.send("<a:sasknzyp:1367460513419759767> Başvurunuz onaylandı! Tebrikler!");
    await interaction.update({ content: `<a:zyponay:1367460361321844777>Başvuru onaylandı ve <@${userId}> kullanıcısına rol verildi.`, embeds: [], components: [] });
    const onaylayanYetkili = interaction.user;
    const embed = new EmbedBuilder()
      .setTitle("📩 Başvuru Onaylandı")
      .setColor("Green")
      .setDescription(`${target} başvurusu **${onaylayanYetkili.tag}** tarafından onaylandı!`)
      .addFields({ name: "Onaylayan Yetkili", value: `${onaylayanYetkili.tag} (<@${onaylayanYetkili.id}>)` })
      .setThumbnail(target.user.displayAvatarURL())
      .setFooter({ text: `Başvuran: ${target.user.tag}`, iconURL: target.user.displayAvatarURL() })
      .setTimestamp();

    const logChannel = interaction.guild.channels.cache.get(config.zypid);
    if (logChannel) {
      await logChannel.send({ embeds: [embed] });
    }
  } 


  else if (interaction.customId.startsWith("reddet_")) {
    await target.send("<a:zypred:1367460426660446258> Başvurunuz reddedildi. İyi günler dileriz.");
    await interaction.update({ content: `<a:zypred:1367460426660446258> Başvuru reddedildi.`, embeds: [], components: [] });


    const embed = new EmbedBuilder()
      .setTitle("📩 Başvuru Reddedildi")
      .setColor("Red")
      .setDescription(`${target} başvurusu reddedildi.`)
      .setThumbnail(target.user.displayAvatarURL())
      .setFooter({ text: `Başvuran: ${target.user.tag}`, iconURL: target.user.displayAvatarURL() })
      .setTimestamp();

    const logChannel = interaction.guild.channels.cache.get(config.zypid);
    if (logChannel) {
      await logChannel.send({ embeds: [embed] });
    }
  }
};
