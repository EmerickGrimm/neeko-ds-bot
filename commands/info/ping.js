module.exports = {
    name: "ping",
    category: "info",
    description: "Возвращает пинг бота",
    run: async (bot, message, args) =>{
        await message.delete().catch (O_o=>{});
        const msg = await message.channel.send(`🔮 Пингую ... `);

        msg.edit(`💁🏼 Задержка: ${Math.floor(msg.createdAt - message.createdAt)}ms`);
    }
} 