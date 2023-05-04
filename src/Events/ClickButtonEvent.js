module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        if (!interaction.isButton()) return;
        try {
            if(interaction.customId == "verify"){
                let roleID = "1100347672591880202"
                if(!interaction.member.roles.cache.has(roleID)){
                    interaction.member.roles.add(roleID)
                    interaction.reply({content: "You have verified succesfully!", ephemeral: true})
                }else {
                    interaction.reply({content: "You are already verified!", ephemeral: true})
                }
            }
        } catch (error) {
            console.error(error);

        }

    }
}