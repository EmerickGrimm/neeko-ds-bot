module.exports = {
    name: 'wallpaper',
   category: 'fun',
   description: 'сиськи.)',
   
   run: async (bot, message, args ) =>{
       const discord  = require('discord.js');  
       const superagent = require("snekfetch");
       const { RichEmbed } = require('discord.js'); 


       await message.delete().catch (O_o=>{}); 



    superagent.get('https://nekos.life/api/v2/img/wallpaper')
        .end((err, response) => {

    console.log(`--------------------`)
    console.log(`Posting hentai yuri pic`)
    console.log(`File: ${response.body.url}`);
    console.log(`Ordered by: ${message.author.tag}`);
    console.log(`--------------------`)

    
    const Embed = new discord.MessageEmbed()
            .setColor('#f5f2ba')
            .setImage(`${response.body.url}`)
            .setTimestamp()
            .setFooter(`Заказал: ${message.author.tag}`)
            message.channel.send(Embed).then(async msg => {
                await msg.react('❤️');
                await msg.react('💔');
       });
        })

   }
}