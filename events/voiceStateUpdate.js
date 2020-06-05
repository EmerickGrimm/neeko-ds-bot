
module.exports = (bot, oldState, newState)=>{
    const fs = require ("fs");
    const mongose = require("mongoose");
    const UserStats = require("../schemes/statsScheme.js")
  console.log(IsItAFK());

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

   
 

    async function NewVoiceSession(_UserID,_GuildID){ //Record Session Start Time
        console.log(`${newState.member.id} joined channel`);
        UserStats.findOne({
            userID: _UserID,
            serverID: _GuildID
        }, (err, userStats) =>{
            if(err) console.log (err);
            if(!userStats){
                const newUStats = new UserStats({
                    userID: _UserID,
                    serverID: _GuildID,
                    userXP: 0,
                    userLevel: 1,
                    MessageSent: 1,
                    TotalTimeInVoice: 0,
                    TopTime: 0,
                    LastSessionDuration: 0,
                    LastSessionEndTime: 0,
                    LastSessionStartTime: new Number (Date.now())
                })
                newUStats.save().catch(err => console.log(err));
            }else{
                userStats.LastSessionStartTime = Date.now()
                userStats.save().catch(err => console.log(err));
                console.log(`LastSessionStartTime: ${userStats.LastSessionStartTime}`)
            }
        })
    }


    async function EndVoiceSession(_UserID,_GuildID,NoXP,member){ //Record End  Session Time
        console.log(`${newState.member.id} left channel`);


        UserStats.findOne({
            userID: _UserID,
            serverID: _GuildID
        }, (err, userStats) =>{
            if(err) console.log (err);

            if (userStats.LastSessionStartTime == 0){
                console.log(`🙃`)
                userStats.LastSessionEndTime = 0
                userStats.save().catch(err => console.log(err));
                NoXP = true;
                userStats.save().catch(err => console.log(err));
            }else {
                userStats.LastSessionEndTime = new Number(Date.now());
                userStats.save().catch(err => console.log(err));
            }
        })
     

        if(NoXP == true){ //No XpMode(?)
            EndTime = 0;
            console.log(`User ${_UserID} got no XP`);    
            return;

            }else{
                GenerateXP(_UserID,_GuildID,member);
            }
    }

     async function GenerateXP(_UserID,_GuildID,member){ //Generate XP for Voice Session

        UserStats.findOne({
            userID: _UserID,
            serverID: _GuildID
        }, (err, userStats) =>{
            if(err) console.log (err);
          
            console.log(`Start Time in DB: ${userStats.LastSessionStartTime}   UserID: ${_UserID}`)
            console.log(`End Time in DB ${userStats.LastSessionEndTime}   UserID: ${_UserID}`)
            let _StartTime = new Number (NaNPrev (userStats.LastSessionStartTime));
            let _EndTime = new Number (NaNPrev (userStats.LastSessionEndTime));
            let _TopTime = new Number (NaNPrev (userStats.TopTime));
            let _TotalTime = new Number (NaNPrev (userStats.TotalTimeInVoice));

            console.log(`Start Time in Generate Func: ${_StartTime}`)
            console.log(`End Time in Generate Func: ${_EndTime}`)

            console.log(`LastSessionDuration That Should be go to func: ${userStats.LastSessionEndTime - userStats.LastSessionStartTime} `)
          
            let _LastSessionDuration = new Number (NaNPrev (msToSeconds(_EndTime - _StartTime)));


            _TotalTime = _TotalTime + _LastSessionDuration;
           let  _xp = (0.0333333333  * _LastSessionDuration);     

             if (_LastSessionDuration > _TopTime){
                 _TopTime = _LastSessionDuration;
                  console.log(`New TopTime! ${_TopTime}`)
                 }

             userStats.TopTime = _TopTime;
             userStats.TotalTimeInVoice = _TotalTime;
             userStats.LastSessionDuration = _LastSessionDuration;
             userStats.LastSessionStartTime = 0;
        
            userStats.save().catch(err => console.log(err));    
        })
    }



     function gainXP(_UserID,_GuildID,_Points,member){ /// Gaining XP 

        UserStats.findOne({
            userID: _UserID,
            serverID: _GuildID
        }, (err, userStats) =>{
            if(err) console.log (err);
          
            let _CurrentXp = new Number (userStats.userXP);
            let _CurrentLevel = new Number (userStats.userLevel);
            let updatedXp = new Number (_CurrentXp + _Points);
            let newLevel = updateLVL(updatedXp,_CurrentLevel,_UserID,member);


       
            userStats.userXP = updatedXp;
            userStats.userLevel = newLevel;
            userStats.save().catch(err => console.log(err));    
        })
    }


function updateLVL(exp,_CurrentLevel,_UserID,member){
    let updatedLevel = (Math.floor((exp/1000)));
   // console.log(Math.floor((exp/1000)))
     //console.log(updatedLevel)
    // console.log(CurrentLevel);
    // console.log((updatedLevel > CurrentLevel));
     if (updatedLevel > _CurrentLevel){
         //console.log(updatedLevel)
        RoleUpdate(updatedLevel,_UserID,member);
         return updatedLevel;
     }else{
         return _CurrentLevel;
     }
}

function generateExperiencePoints(maxPoints){

    return Math.round(Math.random()* maxPoints);
}

function msToSeconds(ms){
   // console.log(`Last session Duration(Function Get number): ${ms}`);

    var seconds = new Number (ms / 1000);
    console.log(`Last session Duration: ${seconds}`);

    return seconds;
}

function RoleUpdate(newLevel,member){
   
    const stranger = member.guild.roles.cache.get('629196137353707529'); //Странник
    const local = member.guild.roles.cache.get('700373227427594341'); //Местный
    const citizen = member.guild.roles.cache.get('687666356572913708'); //горожанин
    const trador = member.guild.roles.cache.get('700375028348354570'); //торговец
    const jentelman = member.guild.roles.cache.get('690308333747568852'); //Джентельмен

    switch (newLevel){
        case 2:
        member.roles.add([stranger.id]).catch(console.error);
        member.send(`${message.author} получил роль ${stranger.toString()} за уровень ${newLevel}! 🙀`)
        break;
        case 6:
            member.roles.add([local.id]).catch(console.error);
            member.send(`${message.author} получил роль ${local.toString()} за уровень ${newLevel}! 🙀`)
            break;
        case 20:
            member.roles.add([citizen.id]).catch(console.error);
            member.send(`${message.author} получил роль ${citizen.toString()} за уровень ${newLevel}! 🙀`)
            break;
        case 40:
            member.roles.add([trador.id]).catch(console.error);
            member.send(`${message.author} получил роль ${trador.toString()} за уровень ${newLevel}! 🙀`)
            break;
        case 60:
            member.roles.add([jentelman.id]).catch(console.error);
            member.send(`${message.author} получил роль ${jentelman.toString()} за уровень ${newLevel}! 🙀`)
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

function NaNPrev(Number){
    if (!Number){
        return Number = 0;
    }else{
        return Number;
    }
}


}



