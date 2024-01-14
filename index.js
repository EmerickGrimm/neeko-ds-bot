global.mongose = require("mongoose");

const {Client, RichEmbed, Collection} = require ('discord.js');
const {config} = require('dotenv');
const Enmap = require('enmap');
const fs = require ("fs");
const stats = require("./schemes/statsScheme.js");
const settings = require("./schemes/settingsScheme.js");


const bot = new Client({
    disableEvryone: true
});


config({
    path: __dirname+ "/.env"
});

bot.commands = new Collection;
bot.aliases = new Collection();

mongose.connect(process.env.DBURI,
    { useNewUrlParser: true, useUnifiedTopology: true,}, (err) =>{
        if(err) return console.log(err);
        console.log(`CONNECTED TO MONGO 🥭!`);
    });


["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});



fs.readdir('./events/',(err, files) =>{
if(err) return console.error;


files.forEach(file => {
    if(!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Loaded ${evtName}.`);
    bot.on(evtName, evt.bind(null,bot));
})

}); 


bot.on("message",async message => {
    const prefix = "!";

    if(message.author.bot) return;
    if(!message.guild) return;

    if (!message.author.bot){

       gainXP(message,10);
    }


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





/// level system ///
 async function gainXP (message, maxPointsGained){
    stats.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err, Stats) =>{
        if(!Stats){
            const newStats = new stats({
                userID: message.author.id,
                serverID: message.guild.id,
                userXP: generateExperiencePoints(maxPointsGained),
                userLevel: 1,
                MessageSent: 1,
                TotalTimeInVoice: 0,
                TopTime: 0,
                LastSessionDuration: 0,
                LastSessionEndTime: 0,
                LastSessionStartTime: 0
            })
            newStats.save().catch(err => console.log(err));
            console.log(`User ${message.author.id} added to DB`)
          //  message.channel.send(`🥰 Теперь и ${message.author.username} получает опыт за сообщения.`)
        }else{
           let NewXP = new Number (Stats.userXP + generateExperiencePoints(maxPointsGained));
            Stats.userXP = NewXP;
            OldLevel = Stats.userLevel;
            Stats.MessageSent = Stats.MessageSent + 1;
            Stats.userLevel = updateLVL(message,NewXP,OldLevel)
            Stats.save().catch(err => console.log(err));
            console.log(`User ${message.author.id} gained xp for message`)

        }
    })
}

function updateLVL(message,exp,CurrentLevel){
   let updatedLevel = (Math.floor((exp/1000)));


    if (updatedLevel > CurrentLevel){
 
        return updatedLevel;
    }else{
        return CurrentLevel;
    }
}


function generateExperiencePoints(maxPoints){

    return Math.round(Math.random()* maxPoints);
}

////////////////////

bot.login(process.env.TOKEN);
