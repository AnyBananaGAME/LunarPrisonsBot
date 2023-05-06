const { EmbedBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        if (!interaction.isButton()) return;
        try {
            if (interaction.customId == "verify") {
                let roleID = "1100347672591880202"
                if (interaction.member.roles.cache.has("1100335742238085132")) {
                    interaction.member.roles.remove("1100335742238085132")
                    interaction.member.roles.add(roleID)
                    interaction.reply({ content: "You have verified succesfully!", ephemeral: true })
                } else {
                    interaction.reply({ content: "You are already verified!", ephemeral: true })
                }
            }
            if (interaction.customId == "ticket-openn") {
                if (interaction.guild.channels.cache.find(
                    (channel) => channel.topic === `${interaction.user.id}`
                )) {
                    return interaction.reply({
                        ephemeral: true,
                        content: "You already have a ticket open",
                    });
                }
                interaction.guild.channels
                    .create(`ticket-${interaction.user.username}`, {
                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                            },
                            {
                                id: interaction.guild.roles.everyone,
                                deny: ["VIEW_CHANNEL"],
                            },
                        ],
                        topic: `${interaction.user.id}`,
                        parent: `1100329060082655272`,
                        type: "text",
                    }).then(async (channel) => {
                        interaction.reply(`Ticket created! ${channel}`);
                        let TicketEmbed = new EmbedBuilder()
                            .setDescription(`
                        Hello ${interaction.user}!\n\nWelcome to your ticket, and please be patient someone will be with you shortly!
                      `)
                        let button1 = new ButtonBuilder()
                            .setCustomId("ticket-close")
                            .setLabel("Close the ticket")
                            .setStyle("Danger")
                        const row = new ActionRowBuilder().addComponents(button1)
                        channel.send({ embeds: [TicketEmbed], components: [row] });
                    });


            }









        } catch (error) {
            console.error(error);

        }

    }
}
