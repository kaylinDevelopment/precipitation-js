module.exports.run = async (client, message, args) => {
    let idToSet = (args.join(" "));
    const config = require('../../config.json')
    const guildName = message.guild.name;
    const fs = require('fs');
    if (message.author.id == 228271067821506560) {
        try {
            if (isNaN(idToSet)) {
                message.reply(":x: **That is not a valid ID!**");
            }
            else {
                fs.writeFile('../../config.json', (`${config.config.guild}.${guildName}{"modRole": "${idToSet}"}`))
                message.reply(`:white_check_mark: **Set moderation role to: ${idToSet}.`)
            }
        } catch (error) {
            console.log(error)
        }

    }
    else return message.reply("Nice try.")
}
module.exports.help = {
    name: "setmodrole",
    args: "[idToSet]",
    notes: "Sets the moderator role of this guild. (Owner Only)"
}

