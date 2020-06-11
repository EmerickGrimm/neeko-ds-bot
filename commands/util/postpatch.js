
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
    "title": "Обновление 1.6",
    "color": 9442302,
    "timestamp": "2020-06-05T13:42:10.540Z",
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
        "name": "Опыт за общение в войсе. ",
        "value": "**Теперь вы сможете получать опыт за общение в голосовом чате! *(Наконец-то)* \n Стоит помнить что: \n • Опыт будет начислен когда вы покинете голосвой чат. \n • Опыт за AFK комнату не начисляется. \n • Вы не получаете опыт с отключенным звуком. (Не микрофоном, а именно звуком.)  ** \n***⚙️ Если что-то не работает, сообщите об этом автору поста.***"
      }
    ]
  };
          message.channel.send("@everyone У нашего бота обновление! ", { embed });
    }
  }
  