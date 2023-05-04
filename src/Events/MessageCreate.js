const db = require("quick.db");
const ms = require("parse-ms");
const { EmbedBuilder, time } = require("discord.js");
const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot) return;
        const id = message.author.id;

        let XP = db.fetch(`xp_${id}`);
        if (XP === null) { XP = 0 }
        let REQXP = db.fetch(`reqxp_${id}`);
        if (REQXP === null) { REQXP = 50 }
        let XPCD = db.fetch(`xpcd_${id}`);
        if (XPCD === null) { XPCD = 0; }
        let LEVEL = db.fetch(`level_${id}`);
        if (LEVEL === null) { LEVEL = 1 }

        // console.log(db.fetchAll())






        let timeout = 1000 * 60 * 1; // 1 Minute if someone is reading this lol


        if (XPCD !== null && timeout - (Date.now() - XPCD) > 0) {
            let time = ms(timeout - (Date.now() - XPCD));
            console.log(
                `${message.author.tag} is on ${time.seconds} cooldown`
            );

            return;
        } else {
            const RandomXp = Math.floor(Math.random() * 10) + 1;

            let time = ms(timeout - (Date.now() - XPCD));
            console.log(
                `${message.author.tag} has received ${RandomXp} xp`
            );

            db.set(`xp_${id}`, Math.floor(Number(XP + RandomXp)));
            db.set(`xpcd_${id}`, Date.now());
        }


        if (XP >= REQXP) {

            db.set(`level_${id}`, Number(LEVEL + 1));
            db.set(`xp_${id}`, 0);
            db.set(`reqxp_${id}`, Number(REQXP * 1.25));


            let emb = new EmbedBuilder()
                .setDescription(`Congrats! ${message.author}\nYou are now level ${LEVEL+1} `)
                .setColor("Blurple")

            let channel = client.channels.cache.get("1103684207441629264")
            let msg = await message.channel.send({ embeds: [emb] });
            await sleep(10000)
            msg.delete();

            //   message.author.send({ embeds: [emb] }); //dm msg
        }





    }
}