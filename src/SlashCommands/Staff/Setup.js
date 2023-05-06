const { SlashCommandBuilder, EmbedBuilder, Embed, PermissionFlagsBits, MessageActivityType, ActionRow, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { token, guildId, clientId } = require("../../Utils/config.json")
const { REST, Routes } = require('discord.js');
const { readdirSync } = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Setup some admin stuff')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('tag')
            .setDescription('Choose a tag to send')
            .setRequired(true)
            .addChoices({
                name: 'Verification',
                value: 'verification'
            })),
    async execute(interaction, client) {
        const opt = interaction.options._hoistedOptions[0].value;
        if (opt === "verification") {
            let VerifyEmbed = new EmbedBuilder()
                .setDescription(
                    "VERIFY HERE!\nTo make sure you are not a bot please click the button below!"
                )
                .setColor("Blurple")

            let button1 = new ButtonBuilder()
                .setCustomId("verify")
                .setLabel("Verify")
                .setStyle("Success")
            const row = new ActionRowBuilder().addComponents(button1

            );
            interaction.channel.send({ embeds: [VerifyEmbed], components: [row] });
            interaction.reply({ content: "Embed succesfully sent!", ephemeral: true })
        }
        if (opt === "ticket") {
            let TicketEmbed = new EmbedBuilder()
                .setDescription(
                    "Hey there!\n\nIf you are here to create a ticket click the button below!\nWe will help you out :D\nDon't make false ticket's it may result in a blacklist"
                    )
                .setColor("Blurple")

            let button1 = new ButtonBuilder()
                .setCustomId("ticket-open")
                .setLabel("Create a ticket")
                .setStyle("Success")
            const row = new ActionRowBuilder().addComponents(button1

            );
            interaction.channel.send({ embeds: [TicketEmbed], components: [row] });
            interaction.reply({ content: "Embed succesfully sent!", ephemeral: true })
        }


    },
};