# Neeko The Discord Bot

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%20v12.0.0-brightgreen.svg)](https://nodejs.org/)
[![npm Version](https://img.shields.io/badge/npm-%3E%3D%206.0.0-brightgreen.svg)](https://www.npmjs.com/)

Neeko The Discord Bot is a Node.js-based Discord bot powered by discord.js and MongoDB. Its primary focus is on user stats tracking, providing insights into users' activities on the server.

## Project Status

**Note:** This Discord bot was initially created as a personal pet project for studying NODE.js. It is not currently updated to the new Discord "applications" design and is not under active development. While it is not fully abandoned, updates may be infrequent, and certain features might not align with the latest Discord changes.

Contributions are still welcome, and the project could be updated in the future. If you find the project useful or have ideas for improvements, feel free to contribute or reach out. Keep in mind that this project is provided as-is, and there are no guarantees of active maintenance.

Thank you for your understanding!

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)


## Features

#### Command Structure

All available commands are organized in the `/commands` folder, categorized into subdirectories:

- `/fun`: Fun and entertainment commands.
- `/games`: Commands related to games.
- `/info`: Information-related commands.
- `/nsfw`: NSFW commands (ensure these are used appropriately and in compliance with Discord's guidelines).
- `/util`: Utility commands.

Each command is a separate file, located in its respective subcategory folder. You can easily customize each command by replacing template texts within the files.

### Stats Tracking

The bot features stats tracking for users, including:

- Total messages sent over time.
- Total time spent in voice chat.

### User Leveling

Users are assigned levels based on their stats. As users interact with the server, their level increases, providing a sense of progression.

### Voice Chat Handling

The bot handles user joining and leaving voice chat through the `/events/voiceStateUpdate.js` event.

### Featured Commands

1. **NSFW Command**
   - Description: Access NSFW pictures and gifs (ensure NSFW content is used appropriately and complies with Discord's guidelines).

2. **Random Osu Map Picker**
   - Description: Select a random Osu! map for users.

3. **Pat Command**
   - Description: Pat another user to express appreciation or affection.

### How to Customize Commands

1. Navigate to the `/commands` folder.
2. Locate the subcategory folder for the desired command.
3. Open the command file and replace template texts with your preferred content.



## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/EmerickGrimm/neeko-ds-bot.git
    ```

2. Change into the project directory:

    ```bash
    cd neeko-ds-bot
    ```

3. Install dependencies:

    ```bash
    npm install
    ```
4. Set up a MongoDB database:

    - Create a MongoDB Atlas account or use your existing one: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
    - Create a new cluster and database.
    - Obtain the MongoDB URI from the cluster.

5. Set up a Discord Application:
    - Create a [Discord](https://discord.com/) account.
    - Go to [Discord Developer Portal](https://discord.com/developers/applications).
    - Press "New Application", and follow instruction.
    - Go to "Bot" tab.
    - Obtain the Bot Token.

5. Create a `.env` file in the root of your project and add the following lines:

    ```env
    DBURI=mongodb://your-mongodb-uri
    TOKEN=your-discord-bot-token
    ```

    Replace `your-mongodb-uri` with the actual URI of your MongoDB database and `your-discord-bot-token` with your Discord bot token.


## Usage

Start the bot:
```bash
npm start
```

## Configuration

### Reaction roles

1. Go to [welcomeroles.js](https://github.com/EmerickGrimm/neeko-ds-bot/blob/master/commands/util/welcomeroles.js)

2. Locate the section of code responsible for role management:

   ```javascript
   if(!message.member.hasPermission("ADMINISTRATOR")){
       return message.reply("Ты не можешь этого делать 🐔").then(m=> m.delete(5000));
   }
   
   await message.delete().catch(O_o => {});

   const a = message.guild.roles.cache.get('682553528891211791'); // CS:GO
   const b = message.guild.roles.cache.get('672489482104209408'); // Overwatch
   const c = message.guild.roles.cache.get('673506380245893121'); // LoL
   const d = message.guild.roles.cache.get('687665235380928527'); // NSFW

   const filter = (reaction, user) => ['🦃', '🤡', '🐹'].includes(reaction.emoji.name) && user.id == message.author.id;

   const embed = new discord.MessageEmbed()
       .setTitle('Доступные Роли')
       .setDescription(`
   
           🔫   ${a.toString()} ***Игроки в CS:GO***
           💛   ${b.toString()} ***Игроки в Overwatch***
           💙   ${c.toString()} ***Игроки в League Of Legends***
           🔞   ${d.toString()} ***Для тех, кто хочет получить доступ к NSFW каналу***
   
   `)
       .setColor(`#03fce3`);
   message.channel.send(embed).then(async msg => {
   
       await msg.react('🔫');
       await msg.react('💛');
       await msg.react('💙');
       await msg.react('🔞');

3. Customize the role IDs and emoji reactions:
    - Replace the role IDs ('682553528891211791', '672489482104209408', etc.) with the actual role IDs in your Discord server.
    - Customize the emoji reactions ('🔫', '💛', etc.) to your preferred emojis.
    - Save the changes to your file.
4. In your welcome channel, send ```!welcomeroles``` to chat.

### Server Rules Message

1. Go to [welcomeroles.js](https://github.com/EmerickGrimm/neeko-ds-bot/blob/master/commands/util/welcomeroles.js)

2. Locate the section of code responsible for sending the server rules message:

   ```javascript
   await message.delete().catch(O_o => {});

   const embed = {
       "title": "Правила Сервера ⚠️",
       "description": "Это короткий свод правил, действующих на этом сервере, за нарушение которых вы можете быть ~~казнены~~ наказаны.",
       "color": 15927051,
       "timestamp": "2020-03-19T10:33:33.443Z",
       "footer": {
           "text": "За нарушение правил вы можете быть забаненны или оказаться в муте."
       },
       "fields": [
           {
               "name": "💬 Оскорбления",
               "value": "**На сервере запрещенны какие-либо оскорбления в любой форме.\nВ том числе: \n👩‍ Сексизм \n🏳️‍🌈 Гомофобия \n👨‍👩‍👧 Оскорбление чьей либо семьи. **  ***\n\nНе забывайте что люди в сети тоже люди, и если вас просят остановиться, то стоит прислушаться.***"
           },
           {
               "name": "🙅🏻‍ Спам ",
               "value": "**Не стоит засорять чат ссылками без контекста, или в целях пиара себя.** \n\n*Если вы хотите чтобы о ваших стримах на Twitch оповещал наш бот, обратитесь к админам сервера.*"
           },
           {
               "name": "🔞 NSFW",
               "value": "**Откровенный контент разрешен, и одобряется, но только в специальном канале.**"
           }
       ]
   };
   message.channel.send({ embed });
   ```
3. Customize the rules message content:

    - Modify the title, description, color, and footer as per your preferences.
    - Adjust the rules in the fields array to match your server's specific rules.
    - Save the changes to your file.
4. In your welcome channel, send ```!postrules``` to chat.

### Help Command

1. Go to [help.js](https://github.com/EmerickGrimm/neeko-ds-bot/blob/master/commands/util/help.js)

2. Locate the section of code responsible for sending the server rules message:

 ```javascript
   name: 'help',
   category: 'util',
   description: 'Выводит список команд',
   
   run: async (bot, message, args ) => {
       const discord = require('discord.js');
       
       await message.delete().catch(O_o => {});
       
       const embed = {
           "title": "Доступные команды",
           "description": "Это команды, которые вы можете использовать. ",
           "color": 3319945,
           "timestamp": "2020-03-19T10:33:33.443Z2020-04-08T11:50:00.154Z",
           "footer": {
               "text": "NSFW команды можно использовать только в специальном канале"
           },
           "fields": [
               {
                   "name": "⚙️ **Полезное**",
                   "value": " `!ping` - Узнать пинг бота \n `!stats` - Узнать свою статистику на сервере (опыт, уровень, и так далее) \n `!pat {user_name}` -- Погладить пользователя"
               },
               {
                   "name": "🖼 **Картиночки**",
                   "value": " `!animepic {Имя персонажа}` - Найдет картинку с персонажем из аниме \n `!wallpaper` - Выдаст случайную обоину \n `!ahegao` -- Найдет для тебя ахегао "
               },
               {
                   "name": "🔞 **NSFW**",
                   "value": " `!fgif` - Найдет для тебя сочную хентай гифку \n `!hentai` - Хентай картинки, для твоих утех  \n `!tits` - Сиськи.\n `!yuri ` - Дела лесбийиские \n `!feet` - Для любителей ножек"
               }
           ]
       };
       message.channel.send({ embed });
   }
   ```

3. Customize the help command content:

    - Modify the title, description, color, and footer as per your preferences.
    - Adjust the command categories and their respective commands in the fields array to match your bot's available commands.
    - Save the changes to your file.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/EmerickGrimm/neeko-ds-bot/blob/master/LICENSE.MD) file for details.
