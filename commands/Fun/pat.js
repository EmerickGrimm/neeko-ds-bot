module.exports = {
    name: 'pat',
   category: 'fun',
   description: 'Погладить кого-то',
   
   run: async (bot, message, args ) =>{
       const discord  = require('discord.js');  
       const superagent = require("snekfetch");
       const { RichEmbed } = require('discord.js'); 


       await message.delete().catch (O_o=>{}); 

       
       
if (message.mentions.members.first().user.id == message.author.id){
    message.channel.send(` ${message.author} Ты не можешь погладить себя! (づ￣ ³￣)づ`);
    return;
}

if(message.mentions.members.first()){
           

        superagent.get('https://purrbot.site/api/img/sfw/pat/gif')
        .end((err, response) => {
        

    console.log(`--------------------`)
    console.log(`Posting pat gif`)
    console.log(`Patting: ${message.mentions.members.first()}`)
    console.log(`File: ${response.body.link}`);
    console.log(`Ordered by: ${message.author.tag}`);
    console.log(`--------------------`)

    
    const Embed = new discord.MessageEmbed()
            .setDescription(`${message.author} погладил ${message.mentions.members.first()}`)
            .setColor('#fc3d03')
            .setImage(`${response.body.link}`)
            .setTimestamp()
            message.channel.send(Embed).then(async msg => {
                await msg.react('❤️');
                await msg.react('💔');
       });
        })

    }else {
        message.channel.send(` ${message.author} Укажи кого хочешь погладить (◕‿◕✿)`)
     }

}

   

}