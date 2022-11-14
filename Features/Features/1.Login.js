module.exports = (client) => {
    client.on('ready', async () => {
         console.log("All functionality is in Working State");
         client.user.setActivity("How to be a bot!!");
    })
}