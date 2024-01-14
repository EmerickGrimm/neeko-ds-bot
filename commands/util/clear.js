module.exports = {

    name: "clear",
    aliases: ["слфук"],
    category: 'util',
    run: async (bot, message, args) =>{

        if(message.deletable){
            message.delete();
        }

        //Member dosen't have permsisions
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("Ты не можешь удалять сообщения ....").then(m=> m.delete(5000));
        }

        if(isNaN(args[0]) || parseInt(args[0]) <= 0){
            return message.reply ("Я не могу удалить 0 сообщений :)").then(m =>  m.deletable(5000));
        }

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")){
            return message.reply("Я не могу удалять сообщения.").then(m => m.delete(5000));
        }

        let deleteAmount;

        if(parseInt(args[0]) > 100){
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`Я удалила ${deleted.size} сообщений`))
            .catch (err => message.reply(`Что-то не так ... ${err}`));

    }

}