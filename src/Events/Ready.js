const { exec } = require("child_process");
let pkg = require("../../package.json")
module.exports = {
    name: "ready",
    async execute(client) {
            (async () => {
                console.log("Ready!")

            })()
    }
}