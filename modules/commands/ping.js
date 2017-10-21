module.exports.run = async (client, message, args) => {
    var pingReplies = ["I'm totally not AstralMod!", "Sausages.", "Rain, rain, go away...", "Don't do drugs, kids.", "[insert generic response here]"];
    message.reply(`:ping_pong: Pong! ${pingReplies[Math.floor(Math.random () * pingReplies.length)]} (Ping time is ${Math.round(client.ping)} ms.)`)
}

module.exports.help = {
    name: "ping",
    args: "n/a",
    notes: "A very simple ping command."
}