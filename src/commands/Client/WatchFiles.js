const { SlashCommandBuilder, DMChannel } = require("discord.js");
const { readJSON } = require('../../misc/readwrite');

const { startWatching } = require('../../misc/FileWatcher')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("start-watch")
        .setDescription("Using this will start/refresh watching for shinies")
        .setContexts([0, 1, 2])
        .setIntegrationTypes([1]),
    global: true,
    async execute(interaction, client) {
        let config = readJSON("config.json");
        
        let ephemeral = interaction.channel instanceof DMChannel ? false : true;
        

        let userIds = config.notify_user_ids;

        for (let i = 0; i < userIds.length; i++) {
            startWatching(client, userIds[i], client, config.image_gen_path);
        }

        await interaction.reply({content: 'The directory watch has been refreshed and started.', ephemeral: ephemeral});
    }
}


