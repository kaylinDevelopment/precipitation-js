module.exports.run = async (client, message, args) => {
    let pingedPerson = message.mentions.users.first;
    if (pingedPerson == null || pingedPerson.length == 0) {
        message.reply(`Here ya go! ${message.author.avatarURL}`);
    }
    else {
        message.reply(`Here ya go! ${pingedPerson.avatarURL}`)
    }
}
module.exports.help = {
    name: 'getavatar',
    args: '[pingedPerson]',
    notes: 'Gets an avatar of a user.'
}