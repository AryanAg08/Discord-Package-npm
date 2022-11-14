module.exports = async (Crenditals) => {

    if (Crenditals) {

        const { Client, GatewayIntentBits, Partials } = require("discord.js");

        const Intents = GatewayIntentBits;
        const allIntents = [
            Intents.Guilds,
            Intents.GuildMessages,
            Intents.GuildMembers,
            Intents.GuildPresences,
            Intents.GuildVoiceStates,
            Intents.GuildBans,
            Intents.GuildInvites,
            Intents.GuildWebhooks,
            Intents.GuildScheduledEvents,
            Intents.GuildMessageReactions,
            Intents.DirectMessages,
            Intents.DirectMessageTyping,
            Intents.DirectMessageReactions,
            Intents.GuildMessageTyping,
        ]

        const client = new Client({
            intents: allIntents,
            partials: [
                Partials.Channel,
                Partials.Message,
                Partials.Reaction,
            ]
        });


        const LoadFeatures = require("./Features/Load-features");
        const LoadCmds = require("./Commands/Load-Cmds");
    
        LoadFeatures(client);
        LoadCmds(client);

        client.login(Crenditals.token);

        console.log('Bot in Online');


        const mongo = require("mongoose");
        const MongoPath = Crenditals.mongo;

        await mongo.connect(MongoPath, {
            keepAlive: true,
        })

        console.log("Mongo is working!!");
        return mongo;
    }

    else {
        throw new Error("Unable to Fetch Crenditals!! \n Please Ensure crentials are in Format.");
    }


}