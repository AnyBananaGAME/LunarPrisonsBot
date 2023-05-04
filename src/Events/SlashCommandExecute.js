module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        if (!interaction.isChatInputCommand()) return;
        //  console.log(interaction);
        const command = interaction.client.slashcommands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            const eee = await interaction.guild.commands.fetch()

            if (eee) {
                for (const command of eee.values()) {
                    await interaction.guild.commands.delete(command.id);
                }
            }

            return;
        }
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);

        }

    }
}