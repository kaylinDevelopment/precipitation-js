module.exports.run = async (client, message, args) => {
    var args = args.join(" ");
    var messageToConvert = args.search(/\b(l|r|c:|:c)+\b/i);

    if (args.includes(messageToConvert)) {
        return message.reply("There is a thing to convert.");
    }
}
module.exports.help = {
    name: 'furrytalk',
    args: '[args]',
    notes: 'Converts a string into Furry English.'
}