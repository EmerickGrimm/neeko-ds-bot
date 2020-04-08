module.exports = {
    name: 'fgif',
   category: 'nsfw',
   description: 'Рандомная хентай гифка',
   
   run: async (bot, message, args ) =>{
       const discord  = require('discord.js');  
       const superagent = require("snekfetch");
       const { RichEmbed } = require('discord.js'); 


       await message.delete().catch (O_o=>{}); 

if (message.channel.nsfw == true){

    superagent.get('https://nekos.life/api/v2/img/Random_hentai_gif')
        .end((err, response) => {

    console.log(`--------------------`)
    console.log(`Posting hentai gif`)
    console.log(`File: ${response.body.url}`);
    console.log(`Ordered by: ${message.author.tag}`);
    console.log(`--------------------`)

    
    const Embed = new discord.MessageEmbed()
            .setColor('#ad42f5')
            .setImage(`${response.body.url}`)
            .setTimestamp()
            .setFooter(`Заказал: ${message.author.tag}`)
            message.channel.send(Embed).then(async msg => {
                await msg.react('💦');
                await msg.react('🤢');
       });
        })
}else{
    message.reply(':warning: Ты не можешь дрочить в общественном месте')
}
   }
}