const mongoose = require("mongoose");

var StatSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    userXP: Number,
    userLevel: Number,
    MessageSent: Number,
    TotalTimeInVoice: Number,
    TopTime: Number,
    LastSessionDuration: Number,
    LastSessionEndTime: Number,
    LastSessionStartTime: Number
})

module.exports = mongoose.model("stats",StatSchema)