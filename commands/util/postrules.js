
module.exports = {

  name: 'postrules',
  category: 'info',
  description: 'Выводи сообщения для канала с приветсвиями',
  
  run: async (bot, message, args ) =>{
      const discord  = require('discord.js');

      
  if(!message.member.hasPermission("ADMINISTRATOR")){
      return message.reply("Ты не можешь этого делать 🐔").then(m=> m.delete(5000));
  }
  
      await message.delete().catch (O_o=>{});

      const embed = {
          "title": "Правила Сервера ⚠️",
          "description": "Это короткий свод правил, действующих на этом сервере, за нарушение которых вы можете быть ~~казнены~~ наказаны. ",
          "color": 15927051,
          "timestamp": "2020-03-19T10:33:33.443Z",
          "footer": {
            "text": "За нарушение правил вы можете быть забаненны или оказаться в муте."
          },
          "fields": [
            {
              "name": "💬 Оскорбления",
              "value": "**На сервере запрещенны какие-либо оскорбления в любой форме.\nВ том числе: \n👩‍ Сексизм \n🏳️‍🌈 Гомофобия \n👨‍👩‍👧 Оскорбление чьей либо семьи. **  ***\n\nНе забывайте что люди в сети тоже люди, и если вас просят остановиться, то стоит прислушаться.***"
            },
            {
              "name": "🙅🏻‍ Спам ",
              "value": "**Не стоит засорять чат ссылками без контекста, или в целях пиара себя.** \n\n*Если вы хотите чтобы о ваших стримах на Twitch оповещал наш бот, обратитесь к админам сервера.*"
            },
            {
              "name": "🔞 NSFW",
              "value": "**Откровенный контент разрешен, и одобряется, но только в специальном канале.**"
            }
          ]
        };
      message.channel.send({ embed });
  }
}