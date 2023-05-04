const { SlashCommandBuilder, EmbedBuilder, Embed, PermissionFlagsBits } = require("discord.js");
const config = require("../../Utils/config.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('createpoll')
        .setDescription('send a poll')
        .addStringOption((option) =>
            option.setName('title')
            .setDescription('Set a title for the poll')
            .setMaxLength(120)
            .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('poll1')
            .setDescription('What should the poll be?')
            .setMaxLength(120)
            .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('poll2')
            .setDescription('What should the poll be?')
            .setMaxLength(120)
            .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('poll3')
            .setDescription('What should the poll be?')
            .setMaxLength(120)
            .setRequired(false)
        )
        .addStringOption((option) =>
            option.setName('poll4')
            .setDescription('What should the poll be?')
            .setMaxLength(120)
            .setRequired(false)
        )

        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction, client) {
        let poll = interaction.options._hoistedOptions[0].value;
        // console.log(interaction.options._hoistedOptions)
        e1 = "1️⃣"
        e2 = "2️⃣"
        e3 = "3️⃣"
        e4 = "4️⃣"

        interaction.reply({ ephemeral: true, content: "Poll created succesfully!" })
        msg = ""
        for (i = 1; i < 4; i++) {
            if (interaction.options._hoistedOptions[i]) {
                emoji = eval("e" + i)

                msg += "\n\n " + "> " + `[${emoji}]   ` + interaction.options._hoistedOptions[i].value
            }
        }
        let title = interaction.options._hoistedOptions[0].value;

        let emb = new EmbedBuilder()
            .setDescription(`**${title}**${msg}`)
            .setColor("Blurple")
        let pollmsg = await interaction.channel.send({ embeds: [emb] })

        for (i = 1; i < 4; i++) {
            if (interaction.options._hoistedOptions[i]) {
                console.log(eval("e" + i))
                emoji = eval("e" + i)
                await pollmsg.react(emoji)
            }

        }




    },
};