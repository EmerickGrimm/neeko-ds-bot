module.exports = {
    name: "ping",
    category: "info",
    description: "Возвращает пинг бота",
    run: async (bot, message, args) =>{
        const msg = await message.channel.send(`🔮 Пингую ... `);

        msg.edit(`💁🏼 Задержка: ${Math.floor(msg.createdAt - message.createdAt)}ms`);
    }
} 