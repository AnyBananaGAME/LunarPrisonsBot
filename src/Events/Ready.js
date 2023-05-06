const { exec } = require("child_process");

module.exports = {
    name: "ready",
    async execute(client) {
        console.log("Ready!")

        setInterval(() => {
            exec("ls -la", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        }, 30000);
    }
}