const { userAgent } = require("booru/dist/Constants");

module.exports = {
    name: "disableall",
    category: "settings",
    description: "Отключает прон",
    run: async (bot, message, args) =>{
        const discord  = require('discord.js');  
        const superagent = require("snekfetch");
        const { RichEmbed } = require('discord.js'); 
        const fs = require ("fs");

        const mongose = require("mongoose");
        const settings = require("../../schemes/settingsScheme.js");

        await message.delete().catch (O_o=>{});
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("Ты не можешь настраивать меня 😏").then(m=> m.delete(5000));
        }
        
        settings.findOne({
            serverID: message.guild.id
        }, (err, Settings) =>{
            if(!Settings){
                console.log("Not founds settings");
                const newSettings = new settings({
                    alertsEnabel: false,
                    postExperienceMessage: false,
                    isNSFWEnabled: false,
                    serverID: message.guild.id
                })
                newSettings.save().catch(err => console.log(err));
                console.log(`Settings for guild ${message.guild.id} added`)
            }else{
                console.log(" founds settings");

                if (Settings.isNSFWEnabled == false){
                    Settings.isNSFWEnabled = true;
                    Settings.save().catch(err => console.log(err));
                    message.channel.send("Включила алерты.");
                }else{
                    Settings.isNSFWEnabled = false;
                    Settings.save().catch(err => console.log(err));
                    message.channel.send("Выключила алерты.");
                }
            }
        })

    }
} 