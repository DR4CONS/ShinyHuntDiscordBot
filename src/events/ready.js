const { readJSON } = require('../misc/readwrite.js');
const { startWatching } = require('../misc/FileWatcher.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log("Logged in as: " + client.user.tag);
        try {
            let config = readJSON("config.json");
            let userIds = config.notify_user_ids;

            for (let i = 0; i < userIds.length; i++) {
                startWatching(client, userIds[i], client, config.image_gen_path);
            }
        } catch (e) {
            console.log("Unable to start file watch, set up config.");
        }
    }
};