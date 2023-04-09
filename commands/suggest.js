const Discord = require("discord.js")
const wixua = require("croxydb");
const config = require("../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = {
  name: "suggest",
  description: "Suggest Sometning!",
  type: 1,
  options: [

{

  name: "name",
  description: "Name your suggestion.",
  type: 3,
  required: true,

},
{

  name: "description",
  description: "Describe your suggestion.",
  type: 3,
  required: true,

}

  ],
  run: async (client, interaction) => {

    const { member, guild, options } = interaction

    const name = interaction.options.getString("name");
    const description = interaction.options.getString("description");

    const row1 = new ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setEmoji("✅")
          .setLabel("(0) I support.")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setCustomId(`yes_suggest`)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setEmoji("❌")
          .setLabel("(0) I do not support")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setCustomId(`no_suggest`)
      )

    const embed = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`A suggestion made by ${member}`)
    .addFields(

{ name: "Suggestion", value: `${name}` },
{ name: "Description", value: `${description}` },

    )
.setFooter({ text: member.user.tag, iconURL: member.user.avatarURL() })
.setThumbnail(interaction.user.avatarURL({ dynamic: true }) || "https://cdn.discordapp.com/avatars/848627773059891220/b4de504c04322533049ce32d09f83157.webp?size=1024" || null)

const channelid = client.channels.cache.get(config.channelid)
    if(!channelid) return;
 channelid.send({embeds: [embed], components: [row1]}).then((s)=> {
     /* s.react("✅")
      s.react("❌")
      s.react("🤔")*/
      wixua.set(`suggest_${s.id}`, true)
    });
   
    


      interaction.reply({content: "Your suggestion has been succesfully submitted.", ephemeral: true})
  }
}
