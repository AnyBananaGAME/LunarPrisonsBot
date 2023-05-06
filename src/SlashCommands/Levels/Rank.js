const { SlashCommandBuilder, EmbedBuilder, Embed, Attachment, AttachmentBuilder } = require("discord.js");
const config = require("../../Utils/config.json")
const Canvas = require("canvas");
const db = require("quick.db")
const {QuickDB} = require("quick.db")
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
        const db = new QuickDB({ driver: client.mysqldriver });
        const id = interaction.member.id;
        const table = await db.tableAsync("user_" + id);

        let TAG = await table.get(`tag_${id}`);
        let XP = await table.get(`xp_${id}`);
        let LEVEL = await table.get(`level_${id}`);
        let REQXP = await table.get(`reqxp_${id}`);
        if (TAG === null) {
            await table.set(`tag_${id}`, message.author.tag)
            await table.set(`xp_${id}`, 1)
            await table.set(`reqxp_${id}`, 50)
            await table.set(`xpcd_${id}`, 0)
            await table.set(`level_${id}`, 1)

            return;
        }





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
        context.fillText(`${XP} / ${Math.floor(REQXP)}  (${Math.floor((XP / REQXP) * 100)}%)`, 280, 200);


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