module.exports = {
   name: 'stats',
   category: 'info',
   description: 'Запостит инфу о тебе',

       
       run: async (bot, message, args ) =>{
           const discord  = require('discord.js');  
           const superagent = require("snekfetch");
           const { RichEmbed } = require('discord.js'); 
           const fs = require ("fs");
           
           let TotalTimeInVoice = 0;
           let TopTime = 0;
           let XP = 0;
           let LVL = 1;
           let TotalTimeStats = ` `;
           let TotalMessageSent;

           await message.delete().catch (O_o=>{}); 
        
           let UserID = message.author.id;
           let GuildID = message.member.guild.id;

           let xpFile = await fs.readFileSync('./userxp.json', 'utf8');
           let xpObject = JSON.parse(xpFile);
           if(xpObject.hasOwnProperty(UserID)){
               let userXpObject = xpObject [UserID];
               if (userXpObject.hasOwnProperty(GuildID)){
                   let guildXpObject = userXpObject[GuildID]
                  TotalTimeInVoice =  (guildXpObject['TotalTimeInVoice']);
                  TopTime = (guildXpObject['TopTime']);
                  XP = (guildXpObject['userXP']);
                  LVL = (guildXpObject['userLevel']);
                  TotalMessageSent =  (guildXpObject['MessageSent']);
               }
              }

              
        
       //  console.log(`Total Time in Voice: ${TotalTimeInVoice}`)
          const embed = {
            "color": 15768125,
            "footer": {
               "icon_url": `${bot.user.avatarURL()}`,
               "text": "Чтобы получить свою статистику, напиши !stats"
            },
            "author": {
              "name": `${message.author.tag}`,
              "icon_url": `${message.author.avatarURL()}`
            },
            "fields": [
              {
                "name": "✨ Опыт:",
                "value": `${XP.toFixed(3)}`
              },
              {
                "name": "🎯 Уровень:",
                "value": `${LVL}`
              },
              {
                "name": "💬 Сообщений:",
                "value": `${TotalMessageSent}`
              },
              {
                "name": "⌚️ Провел в войсе:",
                "value": `${TotalTimeStatsCalc(TotalTimeInVoice)}`
              },
              {
                "name": "☎ Самый долгий разговор:",
                "value": `${TotalTimeStatsCalc(TopTime)}`
              },
              {
                "name": "🚀 Присоеденился к нам",
                "value": `${message.member.joinedAt.toUTCString()}`
              },
              {
                "name": "🎉 Аккаунт создан",
                "value": `${message.author.createdAt.toUTCString()}`
              },
            ]
          };

          message.channel.send({ embed });
         
          function TotalTimeStatsCalc(TotalTimeInVoice){

           // console.log(`Total Time in Voice function get: ${TotalTimeInVoice}`)

            if (TotalTimeInVoice == 0){
              return TotalTimeStats = `Не заходил в войс 💁🏻‍♀️`
            }

            if (TotalTimeInVoice < 60){
              return TotalTimeStats = `${TotalTimeInVoice.toFixed(0)} секунд`

            }

            if (TotalTimeInVoice > 60 && TotalTimeInVoice < 3600){
              var minutes = Math.floor(TotalTimeInVoice / 60).toFixed(0);
              var seconds = (TotalTimeInVoice - minutes * 60).toFixed(0);

              return TotalTimeStats = `${minutes} минут(у) ${seconds} секунд(ы)`
            }

            if (TotalTimeInVoice > 3600){
              var hours = Math.floor((TotalTimeInVoice / 3600).toFixed(0));
              return TotalTimeStats = `${hours} час(а)`
            }


          }
   
       }


     

    }
