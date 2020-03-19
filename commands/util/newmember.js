module.exports = {

    name: "newmember",
    category: "util",
    description: "Эмулирует добавление нового польхователя",
    aliases: " ",

run: async (bot, message, args) =>{

    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.reply("Ты не можешь этого делать 🐔").then(m=> m.delete(5000));
    }
    
    await message.delete().catch (O_o=>{});

    bot.emit('guildMemberAdd', message.member);
    }
}       
