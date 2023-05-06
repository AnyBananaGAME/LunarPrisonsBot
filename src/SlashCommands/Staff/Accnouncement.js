const { SlashCommandBuilder, EmbedBuilder, Embed, PermissionFlagsBits, MessageActivityType, ActionRow, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { token, guildId, clientId } = require("../../Utils/config.json")
const { REST, Routes } = require('discord.js');
const { readdirSync } = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('Create an announcement')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option.setName('announcement')
                .setDescription('Create an announcement')
                .setMaxLength(620)
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const opt = interaction.options._hoistedOptions[0].value;
        message = (opt).replaceAll("{nl}", "\n").replaceAll("{sp}", "      ")
        let AnnounceentEmbed = new EmbedBuilder()
            .setDescription(
                `[<t:${Date.now()}:R>]\n${message}`
            )
            .setColor("Blurple")

        interaction.channel.send({ embeds: [AnnounceentEmbed]});
        interaction.reply({ content: "Embed succesfully sent!", ephemeral: true })


    },
};