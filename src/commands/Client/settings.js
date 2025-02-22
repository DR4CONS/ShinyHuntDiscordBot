const { SlashCommandBuilder, EmbedBuilder, DMChannel } = require("discord.js")
const { readJSON, writeJSON } = require('../../misc/readwrite');
const fs = require('fs');

let config = readJSON("config.json");
let settingsList = [{ "name": `list`, "value": `list` }];
if (config != null) {
    let i = 1;
    for (const setting of Object.keys(config)) {
        if (Array.isArray(config[setting])) {
            settingsList[i++] = { "name": `add ${setting}`, "value": `add ${setting}` };
            settingsList[i++] = { "name": `remove ${setting}`, "value": `remove ${setting}` };
        } else {
            settingsList[i++] = { "name": `${setting}`, "value": `${setting}` };
        }
    }
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("settings")
        .setDescription("Changes specified values.")
        .addStringOption(option =>
            option.setName('setting')
                .setDescription('The setting to change')
                .setRequired(true)
                .addChoices(...settingsList) // Use addChoices instead of setChoices
        )
        .addStringOption(option =>
            option.setName("value")
                .setDescription("New value for the setting")
                .setRequired(false)
        )
        .setContexts([0, 1, 2])
        .setIntegrationTypes([1]),
    global: true,
    async execute(interaction, client) {
        let ephemeral = interaction.channel instanceof DMChannel ? false : true;
        async function reply(message, title = " ", color = '#304d06') {

            const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(title)
                .setDescription(message)
                .setTimestamp()
                .setFooter({ text: ".", iconURL: 'https://cdn.discordapp.com/attachments/1339655860112064602/1339806864140927107/upscalemedia-transformed.png?ex=67b00fe0&is=67aebe60&hm=196e43b4cfa7f434c1a7415ab359edfadeea48970a605b5e77f73eb24832471c&' });

            return await interaction.reply({ content: "", embeds: [embed], ephemeral: ephemeral })
        }
        
        config = readJSON("config.json");config = readJSON("config.json");

        if (config == null) {
            config = {
                "notify_user_ids": [interaction.user.id],
                "image_gen_path": "C:\\PATH\\TO\\IMAGE\\FOLDER"
            };
        }

        let settingChoice = interaction.options.getString("setting");
        let value = interaction.options.getString("value");

        if (settingChoice == "list") {
            settingsList = "";
            for (const setting of Object.keys(config)) {
                settingsList += `**${setting}**: ${config[setting]}\n`
            }
            writeJSON(config, "config.json");
            return reply(settingsList, "Success!");
        }

        settingChoice = settingChoice.split(" ");
        if (settingChoice[0] == "add") {
            config[settingChoice[1]].push(value);
            reply("Added \"" + value + "\" to " + settingChoice, "Success!");
        } else if (settingChoice[0] == "remove") {
            let length = config[settingChoice[1]].length;
            config[settingChoice[1]] = config[settingChoice[1]].filter(item => item !== '1234');
            if (length == config[settingChoice[1]].length) return interaction.editReply("I couldn't find the " + settingChoice[1] + " \"" + value + "\"");
            reply("Removed \"" + value + "\" from " + settingChoice, "Success!");
        } else {
            config[settingChoice[0]] = value;
            reply("Changed " + settingChoice + " to \"" + value + "\"", "Success!");
        }
        writeJSON(config, "config.json");
    }
}
