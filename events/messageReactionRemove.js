module.exports = async(bot, messageReaction, user) =>{

    const message = messageReaction.message;
    const channel = message.guild.channels.cache.find(c => c.name === 'welcome');
    const member = message.guild.members.cache.get(user.id);
    if (member.user.bot) return;

        const a = message.guild.roles.cache.get('682553528891211791'); //CS:GO
        const b = message.guild.roles.cache.get('672489482104209408'); //Overwatch
        const c = message.guild.roles.cache.get('673506380245893121'); //LoL
        const d = message.guild.roles.cache.get('687665235380928527'); //NSFW

    if (['🔫','💛','💙','🔞'].includes(messageReaction.emoji.name)&& message.channel.id === channel.id){
        switch(messageReaction.emoji.name){
            case '🔫':
                member.roles.remove([a.id]).catch(console.error);
                break;
            case '💛':
                member.roles.remove([b.id]).catch(console.error);
                break;
            case '💙':
                member.roles.remove([c.id]).catch(console.error);
                break;
            case '🔞':
                    member.roles.remove([d.id]).catch(console.error);
                    break;
        }
    }

}