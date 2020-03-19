module.exports = (bot, member)=>{

    let userLogs = member.guild.chanels.cache.find(c=> c.name === `user_logs`);

    userLogs.send(`${member.user.tag}  Присоединился!`);


}