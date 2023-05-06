const { QuickDB } = require("quick.db");
const ms = require("parse-ms");
const { EmbedBuilder, time } = require("discord.js");
const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        try {

            if (message.author.bot) return;
            const db = new QuickDB({ driver: client.mysqldriver });
            // console.log(db) 
            const id = message.author.id;
            const table = await db.tableAsync("user_" + id);

            let TAG = await table.get(`tag_${id}`);
            let XP = await table.get(`xp_${id}`);
            let LEVEL = await table.get(`level_${id}`);
            let REQXP = await table.get(`reqxp_${id}`);
            let XPCD = await table.get(`xpcd_${id}`);


            if (TAG === null) {
                await table.set(`tag_${id}`, message.author.tag)
                await table.set(`xp_${id}`, 1)
                await table.set(`reqxp_${id}`, 50)
                await table.set(`xpcd_${id}`, 0)
                await table.set(`level_${id}`, 1)

                return;
            }

            // console.log(table.fetchAll())






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

                table.set(`xp_${id}`, Math.floor(Number(XP + RandomXp)));
                table.set(`xpcd_${id}`, Date.now());
            }


            if (XP >= REQXP) {
                console.log("Weird lvl up")
                table.set(`level_${id}`, Number(LEVEL + 1));
                table.set(`xp_${id}`, 0);
                table.set(`reqxp_${id}`, Number(REQXP * 1.25));


                let emb = new EmbedBuilder()
                    .setDescription(`Congrats! ${message.author}\nYou are now level ${LEVEL + 1} `)
                    .setColor("Blurple")

                let channel = client.channels.cache.get("1103684207441629264")
                let msg = await message.channel.send({ embeds: [emb] });
                await sleep(10000)
                msg.delete();

                //   message.author.send({ embeds: [emb] }); //dm msg
            }




        } catch (error) {
            console.error(error)
        }
    }
}