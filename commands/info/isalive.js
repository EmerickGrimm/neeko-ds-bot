module.exports = {
    name: "isalive",
    category: "info",
    description: "Возвращает пинг бота до других серверов (использующихся в боте)",
    run: async (bot, message, args) =>{
        var tcpp = require('tcp-ping');
        const superagent = require("snekfetch");
        const msg = await message.channel.send(`⚙️ Проверяю  ... `);
        let test1;
        let test1Ping = new Number;

        await message.delete().catch (O_o=>{});

        tcpp.ping({ address: 'nekos.life', port: 80 }, function(err, data) {
            console.log(data);
            if (data.avg == NaN){
                test1 = false;
            }else{
                test1 = true;
                test1Ping = data.avg;
            }
        });


        superagent.get('https://nekos.life/api/v2/endpoints')
        .end((err, response) => {
        
          console.log(`Neko's endpoint result: ${response.body}`);

    }) 
}
}
