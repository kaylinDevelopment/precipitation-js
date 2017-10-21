module.exports.run = async (client, message, args) => {
    let gameToSet = args.join(" ").toLowerCase();
    if (!message.author.id == 228271067821506560){
        return message.reply("You aren't the boss of me.");
    } else {
        client.user.setGame(gameToSet);
        message.reply(`:white_check_mark: **Set my presence to \`${gameToSet}\`.**`);
    }
    
}

module.exports.help = {
    name: 'setgame',
    args: '[gameToSet]',
    notes: 'Sets the presence (game) of the bot. (Owner Only)'
}