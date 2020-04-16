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

    let xpFile = await fs.readFileSync('userxp.json', 'utf8');
        let xpObject = JSON.parse(xpFile);
        if(xpObject.hasOwnProperty(message.author.id)){
            let userXpObject = xpObject [message.author.id];
            if (userXpObject.hasOwnProperty(message.guild.id)){
                let guildXpObject = userXpObject[message.guild.id];
                let newXp = generateExperiencePoints(maxPointsGained);
                let currentXp = guildXpObject['userXP'];
                let CurrentMessageCount = new Number (guildXpObject['MessageSent']);
                let updatedXp = currentXp + newXp;
                let CurrentLevel = guildXpObject['userLevel']

                let MessageCount = new Number (CurrentMessageCount + 1);



                let newLevel = updateLVL(message,updatedXp,CurrentLevel);
                xpObject[message.author.id][message.guild.id]['userXP'] = updatedXp;
                xpObject[message.author.id][message.guild.id]['userLevel'] = newLevel;
                xpObject[message.author.id][message.guild.id]['MessageSent'] = MessageCount;
                

                console.log(`User ${message.author.tag} gained ${newXp} for message`);

                await fs.writeFileSync('userxp.json',JSON.stringify(xpObject,null,4,'utf8'));
            }else{
                xpObject[message.author.id][message.guild.id] = {
                    userXP: generateExperiencePoints(maxPointsGained),
                    userLevel: 1,
                    TotalTimeInVoice: 0,
                    TopTime: 0,
                    LastSessionDuration: 0,
                    MessageSent: 1
                }
                console.log(`Guild ${message.guild.id} has been added`);
                await fs.writeFileSync('userxp.json',JSON.stringify(xpObject,null,4,'utf8'));
            }

        }else{
            let guildId = message.guild.id;
            xpObject[message.author.id] = {}
            xpObject[message.author.id][guildId] = {
                userXP: generateExperiencePoints(maxPointsGained),
                userLevel: 1,
                TotalTimeInVoice: 0,
                TopTime: 0,
                LastSessionDuration: 0,
                MessageSent: 1
            }

            console.log(`User ${message.author.id} has been added to guild ${guildId}`);
            await fs.writeFileSync('userxp.json',JSON.stringify(xpObject,null,4,'utf8'));
        }

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
        RoleUpdate(updatedLevel,message);
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
