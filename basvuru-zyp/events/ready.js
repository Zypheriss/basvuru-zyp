const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`${client.user.tag} olarak giriş yapıldı.`);

    client.user.setPresence({
      status: "dnd",
      activities: [{
        name: "Başvuruları İzliyor",
        type: ActivityType.Playing
      }]
    });
  }
};
