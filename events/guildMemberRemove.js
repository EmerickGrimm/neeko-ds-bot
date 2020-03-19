module.exports = (bot, member)=>{

    let userLogs = member.guild.chanels.find(c=> c.name === `user_logs`);

    userLogs.send(`${member.user.tag}  Покинул нас!`);


}