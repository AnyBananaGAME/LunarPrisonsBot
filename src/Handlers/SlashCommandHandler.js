const { readdirSync } = require("fs")
const { REST, Routes } = require('discord.js');
const { token, guildId, clientId } = require("../Utils/config.json")

module.exports = (client) => {
    client.slashcommandhandler = async(slashcommandFolders, path) => {
        const commands = []

        for (folder of slashcommandFolders) {
            const slashcommandFiles = readdirSync(`./src/Slashcommands/${folder}`).filter(file => file.endsWith('.js'));


            for (const file of slashcommandFiles) {
                const slashcommand = require(`../slashcommands/${folder}/${file}`)

                if ('data' in slashcommand && 'execute' in slashcommand) {
                    commands.push(slashcommand.data.toJSON());
                    client.slashcommands.set(slashcommand.data.name, slashcommand);
                }
            }
        }

        const rest = new REST().setToken(token);
        (async() => {
            try {

                const data = await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), { body: commands },
                );

            } catch (e) {
                console.log(e)
            }
        })()





    }



}