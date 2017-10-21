module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js')
    var baseUptime = client.uptime;
    var minutes = Math.round((baseUptime / 1000 / 60) % 60);
    var hours = Math.round((minutes / 60) % 60);
    var days = Math.round((hours / 24) % 24);
    var baseString = `I've been up for ${hours}:${minutes} hours. (Day count is ${days})`;

    if (minutes <= 9) {
        baseString = `I've been up for ${hours}:0${minutes} hours. (Day count is ${days})`;
    }
    else if (hours <= 9) {
        baseString = `I've been up for 0${hours}:${minutes} hours. (Day count is ${days})`;
    }
    try {
        let embed = new Discord.RichEmbed()
        .setTitle("PrecipitationJS Uptime")
        .setDescription(baseString)
        .setFooter(`PrecipitationJS 0.1.2 | Requested by ${message.author.username} at ${new Date()}`, message.author.avatarURL)
    message.channel.send({ embed })
    } catch(e) {
        console.log(e);
    }
}

module.exports.help = {
    name: 'uptime',
    args: '[none]',
    notes: 'Sends the uptime of PrecipitationJS.'
}
