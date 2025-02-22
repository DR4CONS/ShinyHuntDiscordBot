const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder, ContextMenuCommandBuilder } = require('discord.js');
const fs = require('fs');
const { readJSON } = require('../misc/readwrite');

require('dotenv').config();

const clientId = process.env.clientid;

module.exports = (client) => {
    client.handleGlobalCommands = async (commandFolders, path) => {
        client.clientCommandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                if (command.data instanceof SlashCommandBuilder || command.data instanceof ContextMenuCommandBuilder) {
                    if (command.global) {
                        client.clientCommandArray.push(command.data.toJSON());
                    } else {

                    }
                } else {
                    if (command.global) {
                        client.clientCommandArray.push(command.data);
                    }
                }
            }
        }

        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(clientId), {
                    body: client.clientCommandArray
                },
                );

                console.log('Successfully reloaded ' + client.clientCommandArray.length + ' application (/) commands.');
            } catch (error) {
                console.error("Permission denied. Make sure that the bot's token and client id are correct.");
            }

        })();
    },
    client.handleGuildCommands = async (commandFolders, path, guildId) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                if (command.data instanceof SlashCommandBuilder || command.data instanceof ContextMenuCommandBuilder) {
                    if (!command.global) {
                        client.commandArray.push(command.data.toJSON());
                    } else {

                    }
                } else {
                    if (!command.global) {
                        client.commandArray.push(command.data);
                    }
                }
            }
        }

        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Started refreshing guild (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), {
                    body: client.commandArray
                },
                );

                console.log('Successfully reloaded ' + client.commandArray.length + ' guild (/) commands.');
            } catch (error) {
                console.error("Permission to create guild commands in guild with id: " + guildId + " denied. Please run /setup in the guild this bot is in.");
            }

        })();
    };
};