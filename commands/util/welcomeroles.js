module.exports = {

    name: 'welcomeroles',
    category: 'info',
    description: 'Выводи сообщения для канала с приветсвиями',
    
    run: async (bot, message, args ) =>{
        const discord  = require('discord.js');

        
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.reply("Ты не можешь этого делать 🐔").then(m=> m.delete(5000));
    }
                
                //ROLE SETUP ZONE//    
        await message.delete().catch (O_o=>{});

        const a = message.guild.roles.cache.get('682553528891211791'); //CS:GO
        const b = message.guild.roles.cache.get('672489482104209408'); //Overwatch
        const c = message.guild.roles.cache.get('673506380245893121'); //LoL
        const d = message.guild.roles.cache.get('687665235380928527'); //NSFW

        const filter = (reaction, user) => ['🦃', '🤡', '🐹'].includes(reaction.emoji.name) && user.id == message.author.id;

         const embed = new discord.MessageEmbed()
            .setTitle('Доступные Роли')
            .setDescription(`
        
            🔫   ${a.toString()} ***Игроки в CS:GO***
            💛   ${b.toString()} ***Игроки в Overwatch***
            💙   ${c.toString()} ***Игроки в League Of Legends***
            🔞   ${d.toString()} ***Для тех кто хочет получить доступ к NSFW каналу***
        
         `)
                .setColor(`#03fce3`)
                message.channel.send(embed).then(async msg => {

         await msg.react('🔫');
         await msg.react('💛');
         await msg.react('💙');
         await msg.react('🔞');
});
    }
}