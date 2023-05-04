const { SlashCommandBuilder, EmbedBuilder, Embed, PermissionFlagsBits } = require("discord.js");
const { token, guildId, clientId } = require("../../Utils/config.json")
const { REST, Routes } = require('discord.js');
const { readdirSync } = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload slash commands')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const slashcommandFolders = readdirSync("./src/SlashCommands")
        let commands = []
        client.slashcommands.clear()

        for (folder of slashcommandFolders) {
            const slashcommandFiles = readdirSync(`./src/Slashcommands/${folder}`).filter(file => file.endsWith('.js'));

            for (const file of slashcommandFiles) {
                const slashcommand = require(`../../slashcommands/${folder}/${file}`)

                if ('data' in slashcommand && 'execute' in slashcommand) {
                    commands.push(slashcommand.data.toJSON());
                    client.slashcommands.set(slashcommand.data.name, slashcommand);
                }
            }
        }

        const rest = new REST().setToken(token);
        (async() => {
            try {
                interaction.reply({ content: "Succesfully reloaded slash commands!1", ephemeral: true })

                const data = await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), { body: commands },
                );
            } catch (e) {
                console.log(e)
            }
        })()



    },
};