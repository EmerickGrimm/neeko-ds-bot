
module.exports = {

    name: 'welcomeroles',
    category: 'info',
    description: 'Выводи сообщения для канала с приветсвиями',
    
    run: async (bot, message, args ) =>{
        const discord  = require('discord.js');

        
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.reply("Ты не можешь этого делать 🐔").then(m=> m.delete(5000));
    }
    
        await message.delete().catch (O_o=>{});

        const a = message.guild.roles.cache.get('688657232614785064'); //green
        const b = message.guild.roles.cache.get('688657235802718209'); //purple
        const c = message.guild.roles.cache.get('688657236737654794'); //red

        const filter = (reaction, user) => ['🦃', '🤡', '🐹'].includes(reaction.emoji.name) && user.id == message.author.id;

         const embed = new discord.MessageEmbed()
            .setTitle('Доступные Роли')
            .setDescription(`

            Добро Пожаловать в **${message.guild.name}**! Выбери свои роли: 
        
            🦃 ${a.toString()}
            🤡 ${b.toString()}
            🐹 ${c.toString()}
        
         `)
                .setColor(`#03fce3`)
                message.channel.send(embed).then(async msg => {

         await msg.react('🦃');
         await msg.react('🤡');
         await msg.react('🐹');
});
    }
}
