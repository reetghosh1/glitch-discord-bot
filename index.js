const http = require('http');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 180000);

require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

const prefix = "!";
bot.on('message', msg => {
  if (!msg.content.startsWith(prefix)|| msg.author.bot) return;
  if (msg.content.startsWith(prefix + "hi")) {
    msg.reply('Glitch OP EZ!');
    //msg.channel.send('pong');

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`Pehli fursat mei nikal: ${taggedUser}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
  else if (msg.content.startsWith(prefix + "ping")) {
    var ping = Date.now() - msg.createdTimestamp + " ms";
    msg.reply('My latency is: ' + ping);
  }
    else if (msg.content.startsWith(prefix + "akshat")) {
    msg.reply('BT hai bhai!');
  }
    else if (msg.content.startsWith(prefix + "yashvir")) {
    msg.reply('My ping is 9999999999 ms haha xD');
  }
    else if (msg.content.startsWith(prefix + "lilmalvi")) {
    msg.reply('Stonks');
  }
    else if (msg.content.startsWith(prefix + "shreyas")) {
    msg.reply('dhupchik');
  }
});
