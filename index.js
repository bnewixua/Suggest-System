const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const wixua = require("croxydb")
const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 32
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs");
const { TOKEN } = require("./config.json");
const { Modal } = require("discord-modals");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1
    });

    console.log(`[BOT] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)


client.on('interactionCreate', async (interaction) => {

  if (!interaction.isButton()) return;

  if(interaction.customId === "yes_suggest") {

    
 
    const r = wixua.get(`${interaction.user.id}_${interaction.message.id}`)
    if(r === 1) return interaction.reply({content: "oy vermisin gardas", ephemeral: true})
    wixua.add(`${interaction.user.id}_${interaction.message.id}`, +1)
    wixua.add(`suggestYes_${interaction.message.id}`, 1)
    const yes1 = wixua.get(`suggestYes_${interaction.message.id}`) || "0"
    const no1 = wixua.get(`suggestNo_${interaction.message.id}`) || "0"
 const discord = require("discord.js")
 const a1 = new ActionRowBuilder()
 .addComponents(
 
   new discord.ButtonBuilder()
   .setEmoji("✅")
 .setStyle(discord.ButtonStyle.Secondary)
 .setLabel(`(${yes1}) I support.`)
 .setCustomId("yes_suggest"))
.addComponents(
 new discord.ButtonBuilder()
 .setEmoji("❌")
 .setStyle(discord.ButtonStyle.Secondary)
 .setLabel(`(${no1}) I do not support`)
 .setCustomId("no_suggest"))
    
    interaction.update({components:  [a1] })
    
    }
    
    if (!interaction.isButton()) return;

    if(interaction.customId == "no_suggest") {
     
     
      const r = wixua.get(`${interaction.user.id}_${interaction.message.id}`)
      if(r === 1) return interaction.reply({content: "oy vermisin gardas", ephemeral: true})
      wixua.add(`${interaction.user.id}_${interaction.message.id}`, +1)
      wixua.add(`suggestNo_${interaction.message.id}`, 1)
    //  wixua.set(`${interaction.user.id}_${interaction.message.id}`, true)
      let yes1 = wixua.get(`suggestYes_${interaction.message.id}`) || "0"
      let no1 = wixua.get(`suggestNo_${interaction.message.id}`) || "0"
     const dc = require("discord.js")
      const discord = require("discord.js")
      const a1 = new ActionRowBuilder()
      .addComponents(
      
        new discord.ButtonBuilder()
        .setEmoji("✅")
      .setStyle(discord.ButtonStyle.Secondary)
      .setLabel(`(${yes1}) I support.`)
      .setCustomId("yes_suggest"))
     .addComponents(
      new discord.ButtonBuilder()
      .setEmoji("❌")
      .setStyle(dc.ButtonStyle.Secondary)
      .setLabel(`(${no1}) I do not support`)
      .setCustomId("no_suggest"))
      
      interaction.update({components:  [a1] })
      
      }

})