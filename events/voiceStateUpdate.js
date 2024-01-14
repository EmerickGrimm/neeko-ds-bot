module.exports = (bot, oldState, newState)=>{
    const fs = require ("fs");

  //console.log(IsItAFK());
  global.mongose = require("mongoose");
  const stats = require("../schemes/statsScheme.js");


  if(IsItAFK() == true){
    console.log(`${newState.member.id} is AFK at ${Date.UTC()}, ending session`);
    EndVoiceSession(newState.member.id,newState.member.guild.id,true,newState.member);
    return;
  }

    if(oldState.channel && !newState.channel) { //When user left channnel
            if (oldState.channel.name == 'AFK') return;
            EndVoiceSession(newState.member.id,oldState.channel.guild.id,false,newState.member);

    }else if(!oldState.channel && newState.channel){ //When user joined channel
            if (newState.channel.name == 'AFK') EndVoiceSession(newState.member.id,oldState.channel.guild.id,false,newState.member);
             NewVoiceSession(newState.member.id,newState.channel.guild.id);
    }

    if(newState.selfDeaf){
        console.log(`User ${newState.member.id} has been deafed, ending session.`)
        EndVoiceSession(newState.member.id,oldState.channel.guild.id,false,newState.member);

    } else if (oldState.selfDeaf == true && newState.selfDeaf == false){
        console.log(`User is Undeafed, restoring session.`);
        NewVoiceSession(newState.member.id,newState.channel.guild.id);
    }

    async function NewVoiceSession(UserID,GuildID){ //Record Session Start Time
        console.log(`${UserID} joined channel at ${Date.now()}`);

        stats.findOne({
            userID: UserID,
            serverID: GuildID
        }, (err, Stats) =>{
            if(!Stats){
                const newStats = new stats({
                    userID: UserID,
                    serverID: GuildID,
                    userXP: 0,
                    userLevel: 1,
                    MessageSent: 1,
                    TotalTimeInVoice: 0,
                    TopTime: 0,
                    LastSessionDuration: 0,
                    LastSessionEndTime: 0,
                    LastSessionStartTime: Date.now()
                })
                newStats.save().catch(err => console.log(err));
                console.log(`User ${UserID} added to DB`)
            }else{
                Stats.LastSessionStartTime = Date.now();
                Stats.save().catch(err => console.log(err));
            }
        })
      
    }
    

    async function EndVoiceSession(UserID,GuildID,NoXP,member){ //Record End  Session Time
        console.log(`${newState.member.id} left channel at ${Date.now()}`);


        stats.findOne({
            userID: UserID,
            serverID: GuildID
        }, (err, Stats) =>{ 
            Stats.LastSessionEndTime = Date.now();
            Stats.save().catch(err => console.log(err));
            
            GenerateXP(UserID,GuildID,member);
        })
        
         
    }
        
    

    async function GenerateXP(UserID,GuildID,member){ //Generate XP for Voice Session

        stats.findOne({
            userID: UserID,
            serverID: GuildID
        }, (err, Stats) =>{ 

            if  (Stats.LastSessionEndTime == 0){
                Stats.LastSessionEndTime = Date.now()
                Stats.save().catch(err => console.log(err));
                console.log(`Updated End time from DB: ${Stats.LastSessionEndTime}`)

            }

            console.log(`End time from DB: ${Stats.LastSessionEndTime}`)
            console.log(`Start time from DB: ${Stats.LastSessionStartTime}`)
        
         

            let StartTime =  (Stats.LastSessionStartTime);
            let EndTime = (Stats.LastSessionEndTime);
            let TopTime = (Stats.TopTime);
            let TotalTime = (Stats.TotalTime);

            if (StartTime == 0) {
                EndTime = 0
            }

            if  (TotalTime == 0){
                TotalTime = TopTime;
            }
            
            console.log(`Total Time from DB: ${Stats.TotalTime}`)
            console.log(`Total Time from record: ${TotalTime}`)


            if (TotalTime == undefined) {
                TotalTime = 0;
            } 

            
            if (TopTime == NaN){
                TopTime = 0;
            }

            let LastSessionDuration = (msToSeconds(EndTime - StartTime));

            

            if (LastSessionDuration < 0 ) {
                console.log(`LastSessionDuration is Negetive!`)
                LastSessionDuration * 1;
            }

            console.log(`Last session Duration: ${LastSessionDuration}`)
            TotalTime = TotalTime + LastSessionDuration;


            xp = (0.0333333333  * LastSessionDuration);     


            if (LastSessionDuration > TopTime){
                TopTime = LastSessionDuration;
                console.log(`New TopTime! ${TopTime}`)
            }

            Stats.LastSessionEndTime = 0;
            Stats.LastSessionStartTime = 0;
            Stats.LastSessionDuration = LastSessionDuration;
            Stats.TotalTimeInVoice = Stats.TotalTimeInVoice + LastSessionDuration;
            Stats.TopTime = TopTime;
            Stats.save().catch(err => console.log(err));

            gainXP(UserID,GuildID,xp,member);
        })
 }
        
    



    async function gainXP(UserID,GuildID,Points,member){ /// Gaining XP 

        stats.findOne({
            userID: UserID,
            serverID: GuildID
        }, (err, Stats) =>{ 
            let newXp = Points;
            let currentXp = Stats.userXP;
            let currentLevel = Stats.userLevel;
            let updatedXp = currentXp + newXp;
            let newLevel = updateLVL(updatedXp,currentLevel,UserID,member);

            Stats.userLevel = newLevel;
            Stats.userXP = updatedXp;
            
            Stats.save().catch(err => console.log(err));
            console.log(`User ${UserID} gained ${newXp} for joining voice session`);
        })
      
    }


function updateLVL(exp,CurrentLevel,UserID,member){
    let updatedLevel = (Math.floor((exp/1000)));
   
     if (updatedLevel > CurrentLevel){
        
         return updatedLevel;
     }else{
         return CurrentLevel;
     }
}



function msToSeconds(ms){
    var seconds = new Number (ms / 1000);
    console.log(`Last session Duration: ${seconds}`);

    return seconds;
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
