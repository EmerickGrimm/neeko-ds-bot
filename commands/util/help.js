
module.exports = {

    name: 'help',
    category: 'util',
    description: 'Выводит список команд',
    
    run: async (bot, message, args ) =>{
        const discord  = require('discord.js');
  
        
  
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
                "name": "⚙️ **Полезное**",
                "value": " `!ping` - Узнать пинг бота \n `!stats` - Узнать свою статистику на сервере (опыт, уровень etc) \n `!pat {user_name}` -- Погладить пользователя"
              },
              {
                "name": "🖼 **Картиночки**",
                "value": " `!animepic {Имя персонажа}` - Найдет картинку с персонажем из аниму \n `!wallpaper` - Выдаст случайную обоину \n `!ahegao` -- Найдет для тебя ахегао "
              },
              {
                "name": "🔞 **NSFW**",
                "value": " `!fgif` - Найдет для тебя сочную хентай гифку \n `!hentai` - Хентай картинки, для твоих утех  \n `!tits` - Сиськи.\n `!yuri ` - Дела лесбийиские \n `!feet` - Для любителей ножек"
              }
            ]
          };
        message.channel.send({ embed });
    }
  }
  