module.exports = {
    commands: "Hii",
    minArgs: 0, 
    callback: async (message, text, arguments) => {
           console.log("working!!");
           message.reply("Hii");
    }
}