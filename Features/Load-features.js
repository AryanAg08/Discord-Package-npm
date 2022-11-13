const path = require("path");
const fs = require("fs");

module.exports = (client) => {
    const readFeature = (dir) => {
        const Files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of Files) {
            const stat = fs.lstatSync(path.join(__dirname, file));
            if (stat.isDirectory()) {
                readFeature(path.join(dir, file))
            } 
            else if (file != 'Load-features.js') {
                const feature = require(path.join(__dirname, dir, file))
                console.log(`Enabling Feature ${file}`);
                feature(client);
            }
        } 
    }

    readFeature('.');
}