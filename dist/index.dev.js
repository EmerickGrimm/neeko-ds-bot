"use strict";

global.mongose = require("mongoose");

var _require = require('discord.js'),
    Client = _require.Client,
    RichEmbed = _require.RichEmbed,
    Collection = _require.Collection;

var _require2 = require('dotenv'),
    config = _require2.config;

var Enmap = require('enmap');

var fs = require("fs");

var stats = require("./schemes/statsScheme.js");

var settings = require("./schemes/settingsScheme.js");

var bot = new Client({
  disableEvryone: true
});
config({
  path: __dirname + "/.env"
});
bot.commands = new Collection();
bot.aliases = new Collection();
mongose.connect(process.env.DBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) return console.log(err);
  console.log("CONNECTED TO MONGO \uD83E\uDD6D!");
});
["command"].forEach(function (handler) {
  require("./handler/".concat(handler))(bot);
});
fs.readdir('./events/', function (err, files) {
  if (err) return console.error;
  files.forEach(function (file) {
    if (!file.endsWith('.js')) return;

    var evt = require("./events/".concat(file));

    var evtName = file.split('.')[0];
    console.log("Loaded ".concat(evtName, "."));
    bot.on(evtName, evt.bind(null, bot));
  });
});
bot.on("message", function _callee(message) {
  var prefix, args, cmd, command;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          prefix = "!";

          if (!message.author.bot) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          if (message.guild) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return");

        case 5:
          if (!message.author.bot) {
            gainXP(message, 10);
          }

          if (message.content.startsWith(prefix)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return");

        case 8:
          if (message.member) {
            _context.next = 12;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(message.guild.fetchMember(message));

        case 11:
          message.member = _context.sent;

        case 12:
          args = message.content.slice(prefix.length).trim().split(/ +/g);
          cmd = args.shift().toLowerCase();

          if (!(cmd.length === 0)) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return");

        case 16:
          // Получил команду
          command = bot.commands.get(cmd);
          if (!command) commadn = bot.commands.get(bot.aliases.get(cmd));
          if (command) command.run(bot, message, args);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
});

function updateLVL(message, exp, CurrentLevel) {
  var updatedLevel = Math.floor(exp / 1000);

  if (updatedLevel > CurrentLevel) {
    return updatedLevel;
  } else {
    return CurrentLevel;
  }
}

function generateExperiencePoints(maxPoints) {
  return Math.round(Math.random() * maxPoints);
} ////////////////////


bot.login(process.env.TOKEN);