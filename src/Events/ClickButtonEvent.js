const { EmbedBuilder, ActionRowBuilder, ChannelType, PermissionsBitField, PermissionFlagsBits, ButtonBuilder, Embed, AttachmentBuilder } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        if (!interaction.isButton()) return;
        try {
            if (interaction.customId == "verify") {
                let roleID = "1100347672591880202"
                if (interaction.member.roles.cache.has("1100335742238085132")) {
                    await interaction.member.roles.remove("1100335742238085132")
                    await interaction.member.roles.add("1100347672591880202")
                    await interaction.member.roles.add("1040218657361494112")

                    interaction.reply({ content: "You have verified succesfully!", ephemeral: true })
                } else {
                    interaction.reply({ content: "You are already verified!", ephemeral: true })
                }
            }
            if (interaction.customId == "ticket-open") {
                if (interaction.guild.channels.cache.find(
                    (channel) => channel.topic === `${interaction.user.id}`
                )) {
                    return interaction.reply({
                        ephemeral: true,
                        content: "You already have a ticket open",
                    });
                }
                interaction.guild.channels
                    .create({

                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: interaction.guild.roles.everyone,
                                deny: [PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: "1040218657361494112",
                                deny: [PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: "1100404099888980059",
                                allow: [PermissionFlagsBits.ViewChannel]
                            }
                        ],
                        name: `ticket-${interaction.user.username}`,
                        topic: `${interaction.member.id}`,
                        parent: `1100329060082655272`,
                        type: ChannelType.GuildText,
                    }).then(async (channel) => {
                        interaction.reply({ content: `Ticket created! ${channel}`, ephemeral: true });
                        let TicketEmbed = new EmbedBuilder()
                            .setColor("Blurple")
                            .setDescription(`
                       If you have any concerns related to the server. Create a ticket, a staff member will be with you shortly.
                      `)
                        let button1 = new ButtonBuilder()
                            .setCustomId("ticket-close")
                            .setLabel("Close the ticket")
                            .setStyle("Danger")
                        const row = new ActionRowBuilder().addComponents(button1)

                        channel.send({ content: "<@&1100404099888980059>", embeds: [TicketEmbed], components: [row] });
                    });


            }
            if (interaction.customId == "ticket-close") {
                await interaction.deferReply({ ephemeral: true }).catch((e) => console.log(e));
                interaction.channel.permissionOverwrites.set([
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: interaction.channel.topic,
                        allow: [PermissionFlagsBits.SendMessages],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: "1040218657361494112",
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: "1100404099888980059",
                        allow: [PermissionFlagsBits.ViewChannel]
                    }
                ])

                let embed = new EmbedBuilder()
                    .setDescription("Ticket closed by " + interaction.user.username)
                    .setColor("Blurple")

                let button1 = new ButtonBuilder()
                    .setCustomId("ticket-delete")
                    .setLabel("Delete the ticket")
                    .setStyle("Danger")
                let button2 = new ButtonBuilder()
                    .setCustomId("ticket-reopen")
                    .setLabel("Reopen the ticket")
                    .setStyle("Success")
                const row = new ActionRowBuilder().addComponents([button1, button2])
                interaction.channel.permissionOverwrites.edit(interaction.channel.topic, PermissionFlagsBits.SendMessages)

    
                interaction.channel.send({ embeds: [embed], components: [row] });
            }
            if (interaction.customId == "ticket-reopen") {
                await interaction.deferReply({ ephemeral: true }).catch((e) => console.log(e));
                let embed = new EmbedBuilder()
                    .setDescription("Ticket opened by " + interaction.user.username)
                    .setColor("Blurple")
                interaction.channel.permissionOverwrites.set([
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: "1040218657361494112",
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: "1066632458700869652",
                        allow: [PermissionFlagsBits.ViewChannel]
                    }
                ])

    
                interaction.channel.send({ embeds: [embed] });
            }




            if (interaction.customId == "ticket-delete") {
                await interaction.guild.members.fetch();
                const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                    return interaction.reply({ ephemeral: true, content: "You can not delete the ticket, only staff with Administrator permission can!!!" })
                } else {
                    let embed2 = new EmbedBuilder()
                    .setDescription(`
                    Ticket owner ${interaction.guild.members.cache.get(interaction.channel.topic)}\n
                    Ticket deleted by ${interaction.user.username}
                    Ticked deleted at <t:${Math.floor(Date.now()/1000)}:R>
                    `)
                    .setColor("Blurple")

                    const discordTranscripts = require('discord-html-transcripts');
                    const attachment = await discordTranscripts.createTranscript(interaction.channel, {
                        poweredBy: false,
                        filename: `${interaction.channel.name}.html`
                    });
                    let channel = client.channels.cache.get("1104403327162253442")
                    channel.send({embeds: [embed2], files: [attachment]})
                    interaction.member.send({embeds: [embed2],  files: [attachment] })


                    interaction.channel.send("Deleting the ticket in 5");
                    await sleep(1000)
                    interaction.channel.send("Deleting the ticket in 4");
                    await sleep(1000)
                    interaction.channel.send("Deleting the ticket in 3");
                    await sleep(1000)
                    interaction.channel.send("Deleting the ticket in 2");
                    await sleep(1000)
                    interaction.channel.send("Deleting the ticket in 1");
                    await sleep(1000)
                    interaction.channel.delete()







                }

            }








        } catch (error) {
            console.error(error);

        }

    }
}
