const mongoose = require("mongoose");

var SettingsScheme = mongoose.Schema({
    alertsEnabel: Boolean,
    postExperienceMessage: Boolean,
    isNSFWEnabled: Boolean,
    serverID: String
})

module.exports = mongoose.model("settings",SettingsScheme)