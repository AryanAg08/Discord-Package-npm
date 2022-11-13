module.exports = (client) => {

    const LoadFeatures = require("./Features/Load-features");
    const LoadCmds = require("./Commands/Load-Cmds");

    LoadFeatures(client);
    LoadCmds(client);
}