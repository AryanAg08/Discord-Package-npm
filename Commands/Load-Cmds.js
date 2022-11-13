const path = require("path");
const fs = require("fs");

module.exports = (client) => {
    const BaseFile = 'Command-Base.js';
    const CMDBase = require("./Command-Base");

    const commands = [];

    const ReadCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                ReadCommands(path.join(dir, file))
            } 
            else if (file != BaseFile) {
                const option = require(path.join(__dirname, dir, file));
                commands.push(option)
                if (client) {
                    CMDBase(client, option)
                }
            }
        }
    }
    ReadCommands('.')

    return commands;
}