# Instalation
## Requirements
- The latest [node.js](https://nodejs.org/en/download)
- [Shiny Hunter](https://github.com/DR4CONS/USUM-Shiny-Hunter-Bot) 2.2+
## Creating your bot
- Go to the [Discord developer portal](https://discord.com/developers/applications)
- Press _New Application_ and name it whatever you want.
- Go to the _Installation_ tab, and check _User Install_, _Guild Install_ should be unchecked
- In the same tab, there is a link under _Discord Provided Link_. Save this link by putting it in a notepad or something similar, it will be used later.
- Navigate to the _Bot_ tab. Here you can change the bot's profile name, picture, and banner, but most importantly, you can get your bot's token by pressing the _Reset Token_ button. Save this token similar to the link.
- Along with the token, the bot's user id is needed. This is the same as the application id in the url `https://discord.com/developers/applications/**APLICATION ID IS HERE**/bot`. Save this as well.
- The bot should now be correctly set up!
## Installing the bot
- Download the SHDB-1.X.zip from the [releases page](https://github.com/DR4CONS/ShinyHuntDiscordBot/releases) and unzip it.
- Run _install.bat_, afterwards a folder named "node_modules" should appear and you should get an error similar to "Error [TokenInvalid]: An invalid token was provided." If you got this error, you can delete install.bat and use run.bat in the future.
- To fix this error, replace the placeholders in ._env_ using the token and user id you got earlier, then try to run it again.
- If you got the message "Logged in as: YourBotName#xxxx" then your bot is online. To connect it to your account, go to the link you saved earlier, then press _Authorize_. This allows the bot to DM you and make slash commands tied to your discord account.
- After authorizing the bot, if you go to any discord channel where slash commands are enabled, if you type "/" in the text box, your bot should be one of the options on the left. Use /settings and choose list. The only id under _notify_user_ids_ should be your own.
- Find your _pictures_ folder in your shiny hunter bot. It is located in PARENT_DIRECTORY/Shinybot/pictures. Copy its full path by seledting the picture folder, right clicking, then choosing _Copy as path_.
- Back in discord, use /settings setting:list value:PATH_**WITHOUT_QUOTATIONS**.
- Finnaly use /start-watch and the command prompt should give a message stating that the watch has started. You will not need to use this command again unless you move directories.
