
module.exports = {

    name: 'animepic',
    category: 'fun',
    description: 'Бот найдет для тебя аниме пикчу.',
    
    run: async (bot, message, args ) =>{
        const discord  = require('discord.js');
        
        const { RichEmbed } = require('discord.js');

        const Booru = require('booru')
        const { BooruError, sites } = require('booru')

        const site = 'safebooru'
        const tags = [`${args[0]}`]

        await message.delete().catch (O_o=>{});

        const posts = await Booru.search(site, tags, {limit: 1, random: true});

        console.log(`--------------------`)
        console.log(`Posting anime pic`)
        console.log(`With tags: ${tags}`);
        console.log(`File: ${posts[0].fileUrl}`);
        console.log(`Ordered by: ${message.author.tag}`);
        console.log(`--------------------`)

        
        const Embed = new discord.MessageEmbed()
	            .setColor('#f7defa')
	            .setImage(`${posts[0].fileUrl}`)
                .setTimestamp()
                .setFooter(`Заказал: ${message.author.tag}`)

        message.channel.send(Embed);
    }
}