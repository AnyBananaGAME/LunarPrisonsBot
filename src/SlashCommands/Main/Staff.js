const { SlashCommandBuilder, EmbedBuilder, Embed, PermissionFlagsBits, MessageActivityType, ActionRow, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { token, guildId, clientId } = require("../../Utils/config.json")
const { REST, Routes } = require('discord.js');
const { readdirSync } = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription('Get the list of staff'),

    async execute(interaction, client) {


        let StaffListEmbed = new EmbedBuilder()
            .setDescription(
                `
                **Founder**\n<Asia> <@352410328224628736>\n
                **Ownder**\n<Asia> <@717493022442389776>\n
                **Manager**\n<Asia> <@457040919691264001>\n
                **Admin**\n<Europe> <@599675959888707594>\n<Unknown> <@697416120487116900>\n
                **Developer**\n<Asia> <@352410328224628736> \n<Unknown> <@825441181810425876>\n<Europe> <@599675959888707594>\n<Unknown> <@835927938833580073>\n
                **Moderator** \n\n
                **Helper**\n <Unknown> <@454616357334417420> \n <Asia> <@1088078767731245106>
                
                `
            )
            .setColor("Blurple")

        interaction.channel.send({ embeds: [StaffListEmbed]});
        interaction.reply({ content: "Embed succesfully sent!", ephemeral: true })


    },
};