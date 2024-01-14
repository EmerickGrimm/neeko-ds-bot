const { randInt } = require('booru/dist/Utils');

module.exports = {

    name: 'orb',
    category: 'games',
    description: 'Найдет случайную карту в osu!',

    run: async (bot, message, args ) =>{
        const discord  = require('discord.js');  
        const superagent = require("snekfetch");
        const { RichEmbed } = require('discord.js'); 
        const { v2 } = require('osu-api-extended')

        const {config} = require('dotenv');
        config({
            path: __dirname+ "/.env"
        });
        

        let rid = Math.floor(Math.random() * (1646898 - 75) + 75);

        await message.delete().catch (O_o=>{}); 
        await v2.login(`${process.env.osuClient}`, `${process.env.osuToken}`)
        
        let data = await v2.beatmap.get(rid)

        const msg = await message.channel.send(`Ищу карту, специально для тебя ❤️`);

        while(!data.url){
            let rid = Math.floor(Math.random() * (1646898 - 75) + 75);
            //console.log(rid)
            data = await v2.beatmap.get(rid)
        }
        
        let pic

        if(data.beatmapset.covers.cover.includes('/cover.jpg?0')){
            pic = 'https://cdn.wallpapersafari.com/72/12/ckiyu9.jpg'
        }else{
            pic = data.beatmapset.covers.cover;
        }

       // console.log(data.beatmapset.covers.cover)
       
        
        const Embed = new discord.MessageEmbed()
        .setTitle(`${data.beatmapset.title}`)
        .setURL(`${data.url}`)
        .setDescription(`${":heart:  Лайкнуло: " + data.beatmapset.favourite_count + "\n :video_game: Эту карту сыграли " + data.beatmapset.play_count + " раз(а)" + "\n:musical_note:  BPM: " + data.beatmapset.bpm + "\n:headstone: Статус: " + data.beatmapset.status.charAt(0).toUpperCase() + data.beatmapset.status.slice(1) + "\n :calendar: Карта загружена: " + data.beatmapset.submitted_date}`)
        .setColor('#FF66AA')
        .setImage(`${pic}`)
        .setTimestamp()
        .setFooter(`Команда !orb, найдет для тебя случайную карту для OSU!`, `${bot.user.avatarURL()}`)
        msg.edit(Embed).then(async msg => {
            await msg.react('❤️');
            await msg.react('💔');
   });
   } 
}
