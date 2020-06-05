module.exports = bot =>{

    const {config} = require('dotenv');



    console.log("I'm online!");
    const welcome = bot.channels.cache.find(c => c.name === 'welcome');
    welcome.messages.fetch({limit:10}).then(collected => console.log(`Fetched `+collected.size)).catch(console.error);

    bot.user.setActivity("за сервером", { type: "WATCHING"})
}