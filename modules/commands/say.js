module.exports.run = async (client, message, args) => {
    var messageToSend = args.join(" ");
    try {
        if (message.author.id == 228271067821506560) {
            if (messageToSend.includes("@everyone")) {
                messageToSend.replace("@everyone", "\@everyone");
            }
            if (messageToSend.includes("@here")) {
                messageToSend.replace("@here", "\@here");
            }
            message.delete();
            return message.channel.send(messageToSend);
        }
        else {
            return message.reply("You don't match up...");
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports.help = {
    name: "say",
    args: "[args]",
    notes: `Repeats a string. [Owner Only]`
}
