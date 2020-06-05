global.mongose = require("mongoose");

const {Client, RichEmbed, Collection} = require ('discord.js');
const {config} = require('dotenv');
const Enmap = require('enmap');
const fs = require ("fs");
const stats = require("./schemes/statsScheme.js");

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
            message.channel.send(`🥰 Теперь и ${message.author.username} получает опыт за сообщения.`)
        }else{
           let NewXP = new Number (Stats.userXP + generateExperiencePoints(maxPointsGained));
            Stats.userXP = NewXP;
            OldLevel = Stats.userLevel;
            Stats.MessageSent = Stats.MessageSent + 1;
            Stats.userLevel = updateLVL(message,NewXP,OldLevel)
            Stats.save().catch(err => console.log(err));
        }
    })
}

function updateLVL(message,exp,CurrentLevel){
   let updatedLevel = (Math.floor((exp/1000)));
  // console.log(Math.floor((exp/1000)))
    //console.log(updatedLevel)
   // console.log(CurrentLevel);
   // console.log((updatedLevel > CurrentLevel));
  // CountMessage(message);

    if (updatedLevel > CurrentLevel){
      //  console.log(updatedLevel)
      //  RoleUpdate(updatedLevel,message);
        return updatedLevel;
    }else{
        return CurrentLevel;
    }
}



function RoleUpdate(newLevel,message){
   
    const stranger = message.guild.roles.cache.get('629196137353707529'); //Странник
    const local = message.guild.roles.cache.get('700373227427594341'); //Местный
    const citizen = message.guild.roles.cache.get('687666356572913708'); //горожанин
    const trador = message.guild.roles.cache.get('700375028348354570'); //торговец
    const jentelman = message.guild.roles.cache.get('690308333747568852'); //Джентельмен

    switch (newLevel){
        case 2:
        message.member.roles.add([stranger.id]).catch(console.error);
        message.channel.send(`${message.author} получил роль ${stranger.toString()} за уровень ${newLevel}! 🙀`)
        break;
        case 6:
            message.member.roles.add([local.id]).catch(console.error);
            message.channel.send(`${message.author} получил роль ${local.toString()} за уровень ${newLevel}! 🙀`)
            break;
        case 20:
            message.member.roles.add([citizen.id]).catch(console.error);
            message.channel.send(`${message.author} получил роль ${citizen.toString()} за уровень ${newLevel}! 🙀`)
            break;
        case 40:
            message.member.roles.add([trador.id]).catch(console.error);
            message.channel.send(`${message.author} получил роль ${trador.toString()} за уровень ${newLevel}! 🙀`)
            break;
        case 60:
            message.member.roles.add([jentelman.id]).catch(console.error);
            message.channel.send(`${message.author} получил роль ${jentelman.toString()} за уровень ${newLevel}! 🙀`)
            break;
    }

    return;
}


function generateExperiencePoints(maxPoints){

    return Math.round(Math.random()* maxPoints);
}

////////////////////

bot.login(process.env.TOKEN);
