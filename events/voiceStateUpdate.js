module.exports = (bot, oldState, newState)=>{
    const fs = require ("fs");

  //console.log(IsItAFK());

  if(IsItAFK() == true){
    console.log(`${newState.member.id} is AFK at ${Date.UTC()}, ending session`);
    EndVoiceSession(newState.member.id,newState.member.guild.id,true,newState.member);
    return;
  }

if(oldState.channel && !newState.channel) { //When user left channnel
            if (oldState.channel.name == 'AFK') return;
            EndVoiceSession(newState.member.id,oldState.channel.guild.id,false,newState.member);

}else if(!oldState.channel && newState.channel){ //When user joined channel
             NewVoiceSession(newState.member.id,newState.channel.guild.id);
    }
     

    ////////////////////////////// Level System //////////////////////////////////////////////////

    async function NewVoiceSession(UserID,GuildID){ //Record Session Start Time
        console.log(`${newState.member.id} joined channel`);

        let xpFile = await fs.readFileSync('./userxp.json', 'utf8');
        let xpObject = JSON.parse(xpFile);
        if(xpObject.hasOwnProperty(UserID)){
            let userXpObject = xpObject [UserID];
            if (userXpObject.hasOwnProperty(GuildID)){
                let StartTime = Date.now();
                xpObject[UserID][GuildID]['LastSessionStartTime'] = StartTime;
                await fs.writeFileSync('userxp.json',JSON.stringify(xpObject,null,4,'utf8'));
            }else{
                console.log(`No Guild Found`)
                xpObject[UserID][GuildID] = {
                    LastSessionStartTime: Date.now(),
                    userLevel: 1,
                    TotalTimeInVoice: 0,
                    TopTime: 0,
                    LastSessionDuration: 0.1,
                    userXP: 0,
                    MessageSent: 0
                }
                await fs.writeFileSync('userxp.json',JSON.stringify(xpObject,null,4,'utf8'));
                console.log(`User ${UserID} has been added to guild ${GuildID}`);
            }

        }else{
            console.log(`User not found`)
            let guildId = GuildID;
            console.log (`UserID: ${UserID}`)
            xpObject[UserID] = {}
            xpObject[UserID][guildId] = {
                LastSessionStartTime: Date.now(),
                userLevel: 1,
                TotalTimeInVoice: 0,
                TopTime: 0,
                LastSessionDuration: 0.1,
                userXP: 0,
                MessageSent: 0
             }
             await fs.writeFileSync('userxp.json',JSON.stringify(xpObject,null,4,'utf8'));
             console.log(`User ${UserID} has been added to guild ${GuildID}`);

        }
    }

    async function EndVoiceSession(UserID,GuildID,NoXP,member){ //Record End  Session Time
        console.log(`${newState.member.id} left channel`);

        let xpFile = await fs.readFileSync('./userxp.json', 'utf8');
        let xpObject = JSON.parse(xpFile);
        if(xpObject.hasOwnProperty(UserID)){
            let userXpObject = xpObject [UserID];
            if (userXpObject.hasOwnProperty(GuildID)){
                let EndTime = Date.now();
                xpObject[UserID][GuildID]['LastSessionEndTime'] = EndTime;
                await fs.writeFileSync('userxp.json',JSON.stringify(xpObject,null,4,'utf8'));
              
                if(NoXP == true){ //No XpMode(?)
                    EndTime = 0;
                    console.log(`User ${UserID} got no XP`);
                    xpObject[UserID][GuildID]['LastSessionEndTime'] = EndTime;
                    await fs.writeFileSync('userxp.json',JSON.stringify(xpObject,null,4,'utf8'));
              
                    return;
                    }else{
                        GenerateXP(UserID,GuildID,member);
                    }
                }
            }
    }

    async function GenerateXP(UserID,GuildID,member){ //Generate XP for Voice Session

        let xpFile = await fs.readFileSync('./userxp.json', 'utf8');
        let xpObject = JSON.parse(xpFile);
        if(xpObject.hasOwnProperty(UserID)){
            let userXpObject = xpObject [UserID];
            if (userXpObject.hasOwnProperty(GuildID)){
                let guildXpObject = userXpObject[GuildID];
                
                let StartTime = new Number (guildXpObject['LastSessionStartTime']);
                let EndTime = new Number (guildXpObject['LastSessionEndTime']);
                let TopTime = new Number (guildXpObject['TopTime']);
                
                if (TopTime == NaN){
                    TopTime = 0;
                } 

                let LastSessionDuration = new Number (msToSeconds(EndTime - StartTime));
           
               console.log(`Last session Duration: ${EndTime - StartTime}`);
               console.log(`Last session Duration: ${LastSessionDuration}`);

               // console.log(`Last session Duration(supposed to): ${typeof EndTime - StartTime}`)
                
                let TotalTime = new Number (guildXpObject['TotalTimeInVoice']);
               // console.log(`TotalTime from file: ${TotalTime}`)
                
                TotalTime = TotalTime + LastSessionDuration;
                    // console.log(`Last Session Duration: ${LastSessionDuration}`)
                   //сonsole.log(`TotalTime Supposed to : ${TotalTime + LastSessionDuration}`)
                   // console.log(`Total Time we have: ${TotalTime}`);
                

                xp = (0.0333333333  * LastSessionDuration);     
                
                let zero = 0;

               // console.log(`TopTime! ${TopTime}`)

                if (LastSessionDuration > TopTime){
                    TopTime = LastSessionDuration;
                    console.log(`New TopTime! ${TopTime}`)
                }

                xpObject[UserID][GuildID]['TotalTimeInVoice'] = TotalTime;
                xpObject[UserID][GuildID]['LastSessionDuration'] = LastSessionDuration; 
                xpObject[UserID][GuildID]['LastSessionEndTime'] = zero;
                xpObject[UserID][GuildID]['LastSessionStartTime'] = zero; 
                xpObject[UserID][GuildID]['TopTime'] = TopTime;

                await fs.writeFileSync('userxp.json',JSON.stringify(xpObject,null,4,'utf8'));
                gainXP(UserID,GuildID,xp,member);
            }
        }
    }



    async function gainXP(UserID,GuildID,Points,member){ /// Gaining XP 

        let xpFile = await fs.readFileSync('./userxp.json', 'utf8');
        let xpObject = JSON.parse(xpFile);
        if(xpObject.hasOwnProperty(UserID)){
            let userXpObject = xpObject [UserID];
            if (userXpObject.hasOwnProperty(GuildID)){
                let guildXpObject = userXpObject[GuildID];
                let newXp = Points;
                let currentXp = guildXpObject['userXP'];
                let updatedXp = currentXp + newXp;
                let CurrentLevel = guildXpObject['userLevel']
                let newLevel = updateLVL(updatedXp,CurrentLevel,UserID,member);
                //onsole.log(updatedXp)
                xpObject[UserID][GuildID]['userXP'] = updatedXp;
                xpObject[UserID][GuildID]['userLevel'] = newLevel;

                await fs.writeFileSync('userxp.json',JSON.stringify(xpObject,null,4,'utf8'));

                console.log(`User ${UserID} gained ${newXp} for joining voice session`);

            }
        }
    }


function updateLVL(exp,CurrentLevel,UserID,member){
    let updatedLevel = (Math.floor((exp/1000)));
   // console.log(Math.floor((exp/1000)))
     //console.log(updatedLevel)
    // console.log(CurrentLevel);
    // console.log((updatedLevel > CurrentLevel));
     if (updatedLevel > CurrentLevel){
         //console.log(updatedLevel)
        RoleUpdate(updatedLevel,UserID,member);
         return updatedLevel;
     }else{
         return CurrentLevel;
     }
}

function generateExperiencePoints(maxPoints){

    return Math.round(Math.random()* maxPoints);
}

function msToSeconds(ms){
    var seconds = new Number (ms / 1000);
    console.log(`Last session Duration: ${seconds}`);

    return seconds;
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



function IsItAFK(){

    if (!newState.channel){
        if(!oldState.channel.name == ('AFK')){
            return true;
        }
    }else{
        if (newState.channel.name == ('AFK')){
            return true;
        }else{
            return false;
        }
    }
}


}


    /////////////////////////////////////////////////////////////////////////////////////////////

