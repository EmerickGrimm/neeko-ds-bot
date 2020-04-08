
module.exports = {

    name: 'postcommands',
    category: 'util',
    description: 'Выводит список команд',
    
    run: async (bot, message, args ) =>{
        const discord  = require('discord.js');
  
        
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.reply("Ты не можешь этого делать 🐔").then(m=> m.delete(5000));
    }
    
        await message.delete().catch (O_o=>{});
  
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
                "name": "🖼 **Картиночки**",
                "value": " `!animepic {Имя персонажа}` - Найдет картинку с персонажем из аниму \n `!wallpaper` - Выдаст случайную обоину"
              },{
                "name": "🔞 **NSFW**",
                "value": " `!fgif` - Найдет для тебя сочную хентай гифку \n `!hentai` - Хентай картинки, для твоих утех  \n `!tits` - Сиськи.\n `!yuri ` - Дела лесбийиские \n `!feet` - Для любителей ножек"
              }
            ]
          };
        message.channel.send({ embed });
    }
  }
  