module.exports = {
    name: "isalive",
    category: "info",
    description: "Возвращает пинг бота до других серверов (использующихся в боте)",
    run: async (bot, message, args) =>{
        var tcpp = require('tcp-ping');
        await message.delete().catch (O_o=>{});

        tcpp.ping({ address: 'nekos.life', port: 80 }, function(err, data) {
            console.log(data);
        });
    }
} 