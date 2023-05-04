const { SlashCommandBuilder, EmbedBuilder, Embed, Attachment, AttachmentBuilder } = require("discord.js");
const config = require("../../Utils/config.json")
const Canvas = require("canvas");
const db = require("quick.db")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Check ranks')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('Chose a member to see their rank card')
            .setRequired(false)
        ),
    async execute(interaction, client) {

        let member;
        if (interaction.options._hoistedOptions[0]) {
            member = interaction.options._hoistedOptions[0].member.user
            console.log(interaction.options._hoistedOptions[0].member.user)
        } else {
            member = interaction.user;
        }
        let id = member.id;
        let XP = db.fetch(`xp_${id}`);
        if (XP === null) { XP = 0 }
        let REQXP = db.fetch(`reqxp_${id}`);
        if (REQXP === null) { REQXP = 50 }
        let XPCD = db.fetch(`xpcd_${id}`);
        if (XPCD === null) { XPCD = 0; }
        let LEVEL = db.fetch(`level_${id}`);
        if (LEVEL === null) { LEVEL = 1 }

        const canvas = Canvas.createCanvas(600, 250);
        const context = canvas.getContext("2d");
        const background = await Canvas.loadImage("./src/Utils/Images/RankBG.png");
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeRect(0, 0, canvas.width, canvas.height);
        Canvas.registerFont("./src/Utils/Fonts/co.otf", { family: "Okinawa" });
        Canvas.registerFont("./src/Utils/Fonts/font2.otf", { family: "Trueno" });

        context.fillStyle = "#FFFFFF";
        context.font = '40px "Okinawa"';
        context.fillText(`${member.tag}`, 280, 60);

        context.fillStyle = "#FFFFFF";
        context.font = '40px "Okinawa"';
        context.fillText(`${XP} / ${Math.floor(REQXP)}  (${Math.floor((XP / REQXP) * 100) }%)`, 280, 200);


        context.fillStyle = "#FFFFFF";
        context.font = '40px "Okinawa"';
        context.fillText(`Level ${LEVEL}`, 320, 130);


        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        console.log(member.displayAvatarURL({ extension: 'png' }));
        const avatar = await Canvas.loadImage(
            member.displayAvatarURL({ extension: "png" })
        );

        context.drawImage(avatar, 25, 25, 200, 200);
        const attachment = new AttachmentBuilder(canvas.toBuffer(), "image.png");
        interaction.reply({ files: [attachment] });
    }
}