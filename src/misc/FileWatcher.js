const fs = require("fs");
const path = require('path');
const { AttachmentBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

let fileWatcher; // Holds the reference to the file watcher
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Function to start watching the directory
function startWatching(client, userId, client, watchDirectory) {
    // If a watcher already exists, remove it
    if (fileWatcher) {
        fileWatcher.close();
    }
    watchDirectory += "\\";
    console.log("Started detection in: " + watchDirectory)
    // Start a new file watcher
    fileWatcher = fs.watch(watchDirectory, async (eventType, filename) => {
        if (eventType === 'rename' && filename) {
            const filePath = path.join(watchDirectory, filename);
            if (fs.existsSync(filePath)) {
                if (!(filename.endsWith("png"))) return;
                await delay(1000);
                // Send a message to the specified channel when a new file is created
                user = await client.users.fetch(userId);
                if (user) {
                    let attachment = new AttachmentBuilder(watchDirectory + filename);
                    const greenButton = new ButtonBuilder()
                        .setCustomId(`catch_${filename}`)
                        .setLabel('Shiny')
                        .setStyle(ButtonStyle.Success); // Green

                    const redButton = new ButtonBuilder()
                        .setCustomId(`stop_${filename}`)
                        .setLabel('Not Shiny')
                        .setStyle(ButtonStyle.Danger); // Red

                    const row = new ActionRowBuilder().addComponents(greenButton, redButton);
                    user.send({ content: `Possible shiny found.\n-# controller id: ${filename.charAt(filename.length - 5)}`, files: [attachment], components: [row] });
                } else {
                    console.log("Couldn't message user \"" + userId + "\"");
                }
            }
        }
    });
}

module.exports = {
    startWatching
}