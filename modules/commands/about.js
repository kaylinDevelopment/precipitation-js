module.exports.run = async (client, message, args) => {
    const os = require('os');
    const Discord = require('discord.js');
    const rain = ('Rain#3447')
    const fdd = ('FloppyDiskDrive#2282')
    const jt = ('jtsshieh#6424')
    var embed = new Discord.RichEmbed()
        .setAuthor("Information")
        .setFooter(`Requested by ${message.author.username} on ${new Date()}.`, message.author.url)
        .setDescription(`The following is a bit of information about PrecipitationJS:`)
        .addField(`${rain}: Handing over development to me (${fdd}), assisted in writing a command handler, etc.`)
        .addField(`${jt}: Assisted me in writing the help command. Thanks man!`)
        .addField(`Free Memory: ${Math.round((os.freemem) / 1024 / 1024 / 1024, 2)} GB`)
        .addField(`Total Memory: ${Math.round((os.totalmem) / 1024 / 1024 / 1024, 2)} GB`)
        .addField(`OS: ${os.platform} ${os.release}`)
    message.channel.send({ embed });
}
module.exports.help = {
    name: "about",
    args: "n/a",
    notes: "Shows you info about PrecipitationJS."
}
