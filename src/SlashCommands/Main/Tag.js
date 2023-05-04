const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const config = require("../../Utils/config.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tag')
        .setDescription('send a tag')
        .addStringOption(option =>
            option.setName('tag')
            .setDescription('Choose a tag to send')
            .setRequired(true)
            .addChoices({
                name: 'IP',
                value: 'ip'
            }, {
                name: 'Store',
                value: 'store'
            }, {
                name: 'Vote',
                value: 'vote'
            }))
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('Chose a member to seend the tag to')
            .setRequired(false)
        ),
    async execute(interaction, client) {
        const opt = interaction.options._hoistedOptions[0].value;
        // console.log(interaction.options._hoistedOptions)
        let member = ""
        if (interaction.options._hoistedOptions[1]) {
            member = `<${interaction.options._hoistedOptions[1].member}> `
        }
        if (opt === "ip") {

            let emb = new EmbedBuilder()
                .setColor("Blurple")
                .setDescription(config.ip)
            interaction.reply({ content: member, embeds: [emb] })
        }
        if (opt === "vote") {

            let emb = new EmbedBuilder()
                .setColor("Blurple")
                .setDescription(config.votelink)
            interaction.reply({ content: member, embeds: [emb] })
        }
        if (opt === "store") {
            let info = "Take a look at our store!\n"
            let emb = new EmbedBuilder()
                .setColor("Blurple")
                .setDescription(info + config.storelink)
            interaction.reply({ content: member, embeds: [emb] })
        }





    },
};