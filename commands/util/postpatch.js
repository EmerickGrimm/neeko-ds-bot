
module.exports = {

    name: 'postpatch',
    category: 'info',
    description: 'Выводи сообщение с патчем',
    
    run: async (bot, message, args ) =>{
        const discord  = require('discord.js');
  
        
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.reply("Ты не можешь этого делать 🐔").then(m=> m.delete(5000));
    }
    
        await message.delete().catch (O_o=>{});
  
       
const embed = {
    "title": "Обновление 1.4",
    "color": 9442302,
    "timestamp": "2020-04-16T14:35:23.806Z",
    "image": {
      "url": "https://i.pinimg.com/originals/96/ca/24/96ca242c90b4a21ab38905e0e20795ab.jpg"
    },
    "author": {
      "name": "EmerickGrimm#9719",
      "url": "https://vk.com/emerickgrimm",
      "icon_url": "https://sun6-19.userapi.com/Z7YQbMzbehc-8KgqvnA1oJ1DQSNeDnnivJidBg/2l2Yxp-8QZ4.jpg"
    },
    "fields": [
      {
        "name": "Система Уровней 🏆",
        "value": "**В этом обновлении мы ввели награды за активность на сервере.** \n \n ***Вы будете получать опыт и уровни за:*** \n \n ⚈ Сообщения в текстовом канале \n \n ⚈ Нахождение в голосовом канале. \n \n **По достижению определенных уровней вы будете получать роль.** \n\n*__Чтобы получить свою статистику напишите команду !stats__* \n\n***⚙️ Если что-то не работает, сообщите об этом автору поста.***"
      }
    ]
  };
          message.channel.send("@everyone У нашего бота обновление! ", { embed });
    }
  }
  