const randompuppy = require('random-puppy');
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
    if(msg.member.hasPermission("KICK_MEMBERS"))
    {
      if (msg.mentions.users.size) {
        const taggedUser = msg.mentions.members.first();
        if(!taggedUser.kickable)
        {
          msg.reply('Cannot kick them, sad lyf')
        }
        else{
          msg.channel.send(`Pehli fursat mei nikal: ${taggedUser}`);
          taggedUser.kick();
        }
      } else {
        msg.reply('Please tag a valid user!');
      }
    }
    else
    {
      msg.reply("You do not have permission to kick, better luck next time");
    }
  }
  else if (msg.content.startsWith(prefix + "ping")) {
    var ping = Date.now() - msg.createdTimestamp + " ms";
    msg.reply('My latency is: ' + ping);
  }
  else if (msg.content.startsWith(prefix + "meme")) {
        let reddit = [
        "meme",
        "animemes",
        "MemesOfAnime",
        "animememes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    msg.channel.startTyping();

    randompuppy(subreddit).then(async url => {
            await msg.channel.send({
                files: [{
                    attachment: url,
                    name: 'meme.png'
                }]
            }).then(() => msg.channel.stopTyping());
    }).catch(err => console.error(err));
  }
  
});
