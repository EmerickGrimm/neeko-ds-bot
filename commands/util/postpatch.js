
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
    "title": "Обновление 1.5",
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
        "name": "Фикс багов и новые команды",
        "value": "**В этом обновлении мы исправили баг из-за которого бот не правильно считал ваше время в войсе .** \n \n ***Новые команды:*** \n \n ⚈ !pat {user_name} -- Погладить пользователя \n \n ⚈ !ahegao (по просьбе одного из участников сервера) \n \n***⚙️ Если что-то не работает, сообщите об этом автору поста.***"
      }
    ]
  };
          message.channel.send("@everyone У нашего бота обновление! ", { embed });
    }
  }
  