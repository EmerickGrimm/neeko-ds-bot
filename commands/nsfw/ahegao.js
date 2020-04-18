
module.exports = {

    name: 'ahegao',
    category: 'nsfw',
    description: 'Бот найдет для тебя ахегао.',
    
    run: async (bot, message, args ) =>{
        const discord  = require('discord.js');
        
        const { RichEmbed } = require('discord.js');

        const Booru = require('booru')
        const { BooruError, sites } = require('booru')

        const site = 'safebooru'
        const tags = ['ahegao']

        await message.delete().catch (O_o=>{});

        const posts = await Booru.search(site, tags, {limit: 1, random: true});

        console.log(`--------------------`)
        console.log(`Posting ahegao pic`)
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