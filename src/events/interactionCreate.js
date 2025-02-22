const { InteractionType, EmbedBuilder } = require("discord.js");
const { readJSON } = require('../misc/readwrite.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (interaction.isButton()) {
            function deleteFile(directory, filename) {
                const filePath = path.join(directory, filename); // Get the full path to the file
            
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting the file:', err);
                    } else {
                        console.log(`File ${filename} deleted successfully from ${directory}`);
                    }
                });
            }
            function createFile(directory, filename, content) {
                const filePath = path.join(directory, filename); // Get the full path to the file
            
                fs.writeFile(filePath, content, (err) => {
                    if (err) {
                        console.error('Error creating the file:', err);
                    } else {
                        console.log(`File ${filename} created successfully at ${directory}`);
                    }
                });
            }
            
            config = readJSON("config.json");
            fileFolder = config.image_gen_path;
            
            let button = interaction.customId.split("_");
            button[1] = button.slice(1).join("_");

            if (button[0] == "stop") interaction.reply("Restarting hunt.");
            switch (button[0]) {
                case "catch": {
                    createFile(fileFolder, `save-${button[1].charAt(button[1].length-5)}`, "");

                    interaction.reply("Catching...");
                }
                case "stop": {
                    deleteFile(fileFolder, button[1]);
                }
            }

        } else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.autocomplete(interaction, client);
            } catch (error) {
                console.error(error);
            }
        } else {
            async function editReply(message, ButtonRow, title = " ", ephemeral = true, color = '#304d06') {

                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle(title)
                    .setDescription(message)
                    .setTimestamp()
                    .setFooter({ text: 'error', iconURL: 'https://cdn.discordapp.com/avatars/558440155397095455/d85c9d818e61126c089152e688adce7c.webp' });

                await interaction.editReply({ content: "", embeds: [embed], buttons: [ButtonRow], ephemeral: ephemeral });
            }

            if (!interaction.isCommand()) return;

            const command = client.commands.get(interaction.commandName);

            if (!command) return

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                try {
                    await editReply("There was an error executing that command", null, "⚠ ERROR", true, '#ff0000')
                } catch { }
            }
        }
    }
};