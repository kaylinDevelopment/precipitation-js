module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js');
    const suggestionStartMessage = "**Make a suggestion**\n" +
        "Welcome to the suggestion process! Please read this before you continue.\n" +
        "Here's how this will work.\n\n" +
        "- I'll walk you through the process of creating a suggestion on the suggestions channel.\n" +
        "- Just respond to my prompts by typing a message in this DM and sending it.\n" +
        "- At any time, simply respond with `q` to cancel the suggestion.\n\n" +
        "However, please be aware of the following:\n" +
        "- Your Discord Username will be recorded and sent along with the suggestion.\n" +
        "- Your suggestion will be publicly visible.\n" +
        "- Any misuse of this command, including (but not limited to) spam will lead to appropriate discipline from staff.\n\n" +
        "**Here are some things not to suggest because they will be immediately declined.** This counts as misuse of the suggest command, so hit `q` now if you were going to suggest one of these.\n" +
        "- New text/voice channels.\n" +
        "- Anything to do with PrecipitationJS.\n" +
        "- New bots.\n\n" +
        "Wait 30 seconds, and then respond with `y` if you understood the above."


    function getUserString(user) {
        var u = user;
        if (user.user != null) {
            u = user.user;
        }
        return u.tag;
    }

    function handleSuggest(message) {
        var state = suggestStates[message.author.id];
        if (state.lastEmbed != null) {
            state.lastEmbed.delete();
            state.lastEmbed = null;
        }

        if (message.content.toLowerCase() == "q") {
            //Abort

            var embed = new Discord.RichEmbed("test");
            embed.setAuthor("[CANCELLED]");
            embed.setColor("#FF0000");
            embed.setDescription("\u200B");

            var title;
            if (state.title == null) {
                title = "~~Title~~";
            } else {
                title = "~~" + state.title + "~~";
            }

            var suggestion;
            if (state.suggestion == null) {
                suggestion = "~~Suggestion~~";
            } else {
                suggestion = "~~" + state.suggestion + "~~";
            }

            embed.addField(title, suggestion);

            message.author.send("", { embed: embed });

            message.author.send(":octagonal_sign: **Suggestion process cancelled.**");
            state = null;
        } else {
            switch (state.state) {
                case 1: //Welcome to the suggestion tool
                    if (message.content.toLowerCase() == "y" || message.content.toLowerCase() == "yes") {
                        if (state.startTime.getTime() + 30000 > (new Date()).getTime()) {
                            message.author.send("Read the above carefully. Any violation of the above will result in punishment from staff.");
                        } else {
                            //Continue
                            state.state = 2;

                            var embed = new Discord.RichEmbed("test");
                            embed.setAuthor("Suggestion");
                            embed.setColor("#00CA00");
                            embed.setDescription("\u200B");

                            if (state.suggestion == null) {
                                embed.addField("__Title__\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_", "Suggestion");
                            } else {
                                embed.addField("__Title__\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_", state.suggestion);
                            }

                            embed.setFooter("User ID: " + message.author.id);
                            message.author.send("", { embed: embed }).then(function (message) {
                                state.lastEmbed = message;
                            });

                            message.author.send("What will be the title for your suggestion? It needs to be 30 characters or less.");
                        }
                    } else if (message.content.toLowerCase() == "q") {
                        //Abort
                        message.author.send("Suggestion process cancelled.");
                        state = null;
                    } else {
                        message.author.send("Hmm, I didn't quite understand that. Please type `y` or `yes`.")
                    }
                    break;
                case 2: //Title
                    if (message.content.length > 30) {
                        message.author.send("Your title needs to be 30 characters or less. Try again.");
                    } else if (containsExpletive(message.content)) {
                        message.author.send("That's a bit rude.. let's try again, but please be a bit more polite.");
                    } else if (message.content.length < 3) {
                        message.author.send("What can you suggest with less than 3 letters? Try again.");
                    } else {
                        state.title = message.content;

                        if (state.suggestion == null) {
                            state.state = 3;

                            var embed = new Discord.RichEmbed("test");
                            embed.setAuthor("Suggestion");
                            embed.setColor("#00CA00");
                            embed.setDescription("\u200B");

                            embed.addField(state.title, "__Suggestion__\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_");

                            message.author.send("", { embed: embed }).then(function (message) {
                                state.lastEmbed = message;
                            });

                            message.author.send("What is your suggestion? Be sure to be cohesive and to back your suggestion up with evidence.");
                        } else {
                            state.state = 4;

                            var embed = new Discord.RichEmbed("test");
                            embed.setAuthor("Suggestion");
                            embed.setColor("#00CA00");
                            embed.setDescription("\u200B");

                            embed.addField(state.title, state.suggestion);

                            message.author.send("", { embed: embed }).then(function (message) {
                                state.lastEmbed = message;
                            });

                            message.author.send("Ready to submit this suggestion?");
                        }
                    }
                    break;
                case 3: //Suggestion
                    if (message.content.length > 500) {
                        message.author.send("That's a rather long suggestion. Try again, and make it shorter this time.");
                    } else if (containsExpletive(message.content)) {
                        message.author.send("That's a bit rude.. let's try again, but please be a bit more polite.");
                    } else {
                        state.suggestion = message.content;
                        state.state = 4;

                        var embed = new Discord.RichEmbed("test");
                        embed.setAuthor("Suggestion");
                        embed.setColor("#00CA00");
                        embed.setDescription("\u200B");

                        embed.addField(state.title, state.suggestion);

                        message.author.send("", { embed: embed }).then(function (message) {
                            state.lastEmbed = message;
                        });

                        message.author.send("Ready to submit this suggestion?");
                    }
                    break;
                case 4: //Confirm
                    if (message.content.toLowerCase().startsWith("y")) {
                        //Submit
                        var embed = new Discord.RichEmbed("test");
                        embed.setAuthor(message.author.username, message.author.displayAvatarURL);
                        embed.setColor("#00CA00");

                        embed.addField(state.title, state.suggestion);

                        embed.setFooter("Submitted at " + new Date().toUTCString());

                        var channel;
                        if (state.guild == 297218185374203904) {
                            channel = client.channels.get("361333006595653634");
                        }

                        channel.send("", { embed: embed });
                        state = null;
                        message.author.send(":green_check: Your suggestion has been submitted! The staff will review it shortly.");
                    } else if (message.content.toLowerCase() == "r" || message.content.toLowerCase() == "start over" || message.content.toLowerCase() == "retry" || message.content.toLowerCase() == "no" ||
                        message.content.toLowerCase() == "restart") {
                        state.state = 2;
                        state.suggestion = null;
                        state.startTime = new Date();
                        message.author.send(suggestionStartMessage);
                    } else if (message.content.toLowerCase() == "cancel" || message.content.toLowerCase() == "q") {//Abort
                        var embed = new Discord.RichEmbed("test");
                        embed.setAuthor("[CANCELLED]");
                        embed.setColor("#FF0000");
                        embed.setDescription("\u200B");

                        var title;
                        if (state.title == null) {
                            title = "~~Title~~";
                        } else {
                            title = "~~" + state.title + "~~";
                        }

                        var suggestion;
                        if (state.suggestion == null) {
                            suggestion = "~~Suggestion~~";
                        } else {
                            suggestion = "~~" + state.suggestion + "~~";
                        }

                        embed.addField(title, suggestion);

                        message.author.send("", { embed: embed });

                        message.author.send("Suggestion process cancelled.");
                    } else {
                        message.author.send("Use English, please. `yes` or `retry` will do.");
                    }
                    break;
            }
        }
        suggestStates[message.author.id] = state;
    }
}
module.exports.help = {
        name: "suggest",
        args: "none",
        notes: "Suggests something for the server to see!"
    }