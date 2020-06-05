module.exports = {
   name: 'stats',
   category: 'info',
   description: 'Запостит инфу о тебе',      
   run: async (bot, message, args ) =>{
           const discord  = require('discord.js');  
           const superagent = require("snekfetch");
           const { RichEmbed } = require('discord.js'); 
           const fs = require ("fs");

           const mongose = require("mongoose");
           const UserStats = require("../../schemes/statsScheme.js");

           
           let TotalTimeInVoice = 0;
           let TopTime = 0;
           let XP = 0;
           let LVL = 1;
           let TotalTimeStats = ` `;
           let TotalMessageSent;

           await message.delete().catch (O_o=>{}); 
        
           let UserID = message.author.id;
           let GuildID = message.member.guild.id;


           UserStats.findOne({
            userID: UserID,
            serverID: GuildID
          }, (err, userStats) =>{
            if(err) console.log (err);
          
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
                  "value": `${userStats.userXP.toFixed(3)}`
                },
                {
                  "name": "🎯 Уровень:",
                  "value": `${userStats.userLevel}`
                },
                {
                  "name": "💬 Сообщений:",
                  "value": `${userStats.MessageSent}`
                },
            /*    {
                  "name": "⌚️ Провел в войсе:",
                  "value": `${TotalTimeStatsCalc(userStats.TotalTimeInVoice)}`
                },
                {
                  "name": "☎ Самый долгий разговор:",
                  "value": `${TotalTimeStatsCalc(userStats.TopTime)}`
                }, */
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
           
        })

         //  console.log(`Total Time in Voice: ${TotalTimeInVoice}`)
   
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
  
