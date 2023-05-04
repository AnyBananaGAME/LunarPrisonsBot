const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const chalk = require("chalk")
const config = require("./src/Utils/config.json");
const { readdirSync } = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});

const handlers = readdirSync("./src/Handlers").filter(file => file.endsWith('.js'));
const eventFiles = readdirSync("./src/Events").filter(file => file.endsWith('.js'));
const commandFolders = readdirSync("./src/Commands")
const slashcommandFolders = readdirSync("./src/SlashCommands")


client.commands = new Collection();
client.slashcommands = new Collection();
client.slashcommandsarr = new Collection();

(async() => {
        try {
            for (const file of handlers) {
                require(`./src/handlers/${file}`)(client);
                console.log(`${chalk.gray("[")}${chalk.red("!")}${chalk.gray("]")} ${chalk.blueBright(`Loading Handler ${file}`)}`)
    }
    
    client.eventhandler(eventFiles, "./src/events");
    client.commandhandler(commandFolders, `./src/commands`);
    client.slashcommandhandler(slashcommandFolders, './src/SlashCommands')
    client.login(config.token);
       
    } catch (error) {
    console.log(error)    
}
})()