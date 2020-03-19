const {Client, RichEmbed, Collection} = require ('discord.js');
const {config} = require('dotenv');
const Enmap = require('enmap');
const fs = require ("fs");
const bot = new Client({
    disableEvryone: true
});

bot.commands = new Collection;
bot.aliases = new Collection();


config({
    path: __dirname+ "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

bot.on("ready",() =>{
    console.log("I'm online!")

 
});




bot.on("message",async message => {
    const prefix = "!";

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Получил команду
    let command = bot.commands.get(cmd);
    
    if(!command) commadn = bot.commands.get(bot.aliases.get(cmd));

    if (command)
        command.run(bot, message, args);
});

bot.listen(process.env.PORT || 5000);

bot.login(process.env.TOKEN);