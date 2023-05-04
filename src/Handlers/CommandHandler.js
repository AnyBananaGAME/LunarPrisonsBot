const { readdirSync } = require("fs");
const config = require("../Utils/config.json");
const chalk = require("chalk");
module.exports = (client, message) => {
    client.commandhandler = async(commandFolders, path) => {
        for (folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/Commands/${folder}`)
                .filter((file) => file.endsWith(".js"))
            for (const file of commandFiles) {
                const command = require(`../Commands/${folder}/${file}`);
                client.commands.set(command.name, command, folder);
            }
        }

        (async() => {
            try {
                await console.log(
                    chalk.gray("[") +
                    chalk.green("+") +
                    chalk.gray("]") +
                    chalk.white(`(Prefix) commands have been loaded`)
                );
            } catch (error) {
                console.log(
                    chalk.gray("[") +
                    chalk.red("ERROR") +
                    chalk.gray("]") +
                    chalk.white(` ${console.error(error)}`)
                );
            }
        })();
    };
};