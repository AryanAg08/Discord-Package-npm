const validatePermissions = (permissions) => {
    const ValidPerms = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
       if (!validatePermissions.includes(permission)) {
        throw new Error(`Unknown permission node "${permission}"`);
       }
    }
}

let recentlyRan = [] 

module.exports = (client, commandOptions) => {
    let {
        commands, 
        expectedArgs = '',
        permissionError = 'You do not have permission to run this command.',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        channels = [],
        Guilds = [],
        callback,
    } = commandOptions


    if (typeof commands === 'string') {
        commands = [commands]
    }

    console.log(`Registering command "${commands[0]}`);

    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }

     client.on('messageCreate', async (message) => {
        if (message.channel.type === "DM") return;
        const { member , content, guild, channel } = message
        const prefix = "!"
        
        // For particular guilds //
        if (Guilds) {
              for (GG of Guilds) {
                if (guild.id === GG) {
                     for (const alias of comamnds ) {
                        const command = `${prefix}${alias.toLowerCase()}`


                        if (
                            content.toLowerCase().startsWith(`${command}`) || content.toLowerCase() === command
                        ) {
                            // Running command

                            // Checking the channel if mentioned in the commands
                            for (const chan of channels) {
                                if (channel.id != chan) {
                                       message.reply(`This command is Channel Specific. \n Only works in <#${chan}>`);
                                       return;
                                }
                            }


                            // Checking Permissions 

                            for (const permission of permissions) {
                                if (!member.permission.has(permission)) {
                                    message.reply(permissionError + `${permission}`);
                                    return;
                                }
                            }

                            // Checking Roles 

                            for (Roles of requiredRoles) {
                                  
                                const role = guild.roles.cache.find(
                                    role => role.name || role.id === requiredRoles
                                )

                                if (!role || !member.roles.cache.has(role.id)) {
                                    message.reply(`You must have <@&${role.id} to use this command.`);
                                    return;
                                }
                            }

                            // Splitting the arguments from the message content 
                            const arguments = content.split(/[ ]+/);

                            // Seperate command from rest of the content
                            arguments.shift()

                            // Checking Min and Max Arguments
                            if (
                                arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)
                            ) {
                                message.reply(`Tncorrect Syntax!! Use ${prefix}${alias}  ${expectedArgs}`);
                                return;
                            }

                            callback(message, arguments, arguments.join(' '), client)

                            return;

                        }
                     }           
                } 
                else {
                    return console.log("This command is for only Particular Server.")
                } 
              }     
        } else return;
     })
    
}