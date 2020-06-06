module.exports = {
    name: "isalive",
    category: "info",
    description: "Возвращает пинг бота до других серверов (использующихся в боте)",
    run: async (bot, message, args) =>{
        var tcpp = require('tcp-ping');
        const superagent = require("snekfetch");

        await message.delete().catch (O_o=>{});

        tcpp.ping({ address: 'https://nekos.life', port: 443 }, function(err, data) {
            console.log(data);
        });


        superagent.get('https://nekos.life/api/v2/endpoints')
        .end((err, response) => {
        
          console.log(`Neko's endpoint result: ${response.body}`);

    }) 
}
}
