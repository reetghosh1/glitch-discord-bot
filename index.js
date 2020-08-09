const fs = require('fs');
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
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


const prefix = "g!";
bot.on('message', msg => {
  if (!msg.content.startsWith(prefix)|| msg.author.bot) return;
  if (msg.content.startsWith(prefix + "hi")) {
    msg.reply('Glitch OP EZ!');
    //msg.channel.send('pong');

  } 
  else if (msg.content.startsWith('g!kick')) {
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
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "meirl",
        "me_irl",
        "2meirl4meirl",
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
    }).catch(err => msg.channel.send(err));
  }
  else if (msg.content.startsWith(prefix + "indianmeme")) {
    let sub = "IndianDankMemes";
        randompuppy(sub).then(async url => {
            await msg.channel.send({
                files: [{
                    attachment: url,
                    name: 'meme.png'
                }]
            }).then(() => msg.channel.stopTyping());
    }).catch(err => console.log(err));
  }
  else if (msg.content.startsWith('g!warn'))
  {
    if(msg.member.hasPermission("KICK_MEMBERS")){
    const args = msg.content.slice(prefix.length).trim().split(' ');

    var warnuser = msg.guild.member(msg.mentions.users.first());
    var reason = args.slice(1).join(" ");

    if(!warnuser)
    {
      return msg.reply("Cannot find user!");
    }
    if(warnuser.hasPermission("MANAGE_MESSAGES"))
    {
      return msg.reply("Cannot warn this user!");
    }
    if(!warns[warnuser.id])
    {
      warns[warnuser.id] = {
        warns: 0
      };
    }

    warns[warnuser.id].warns++;
    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if(err)
        {
          console.log(err);
        }
    });

    var embed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setFooter(msg.member.displayName, msg.author.displayAvatarURL)
      .setTimestamp()
      .setDescription(`**Warning** ${warnuser} (${warnuser.id})
      **Warned by:** ${msg.author}
      **Reason:** ${reason}`)
      .addField("Warning Count", warns[warnuser.id].warns);

    var channel = msg.guild.channels.cache.find(channel => channel.name === "log");

    if(!channel)
    {
      return;
    }

    channel.send(embed);
    msg.channel.send(embed);

    if(warns[warnuser.id].warns==3)
    {
      var embed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setDescription(`**ATTENTION!**${warnuser}`)
      .addField("Message", "You are 1 warning away from getting kicked!");

      msg.channel.send(embed);
    }
    else if(warns[warnuser.id].warns==4)
    {
      msg.guild.member(warnuser).kick(reason);
      msg.channel.send(`${warnuser} was kicked for incurring too many warnings!`);
    }

  }
  else
  {
    msg.reply("You do not have the permission to do that!")
  }
  }
  else if (msg.content.startsWith('g!forgive'))
  {
    if(msg.member.hasPermission("KICK_MEMBERS")){
    const args = msg.content.slice(prefix.length).trim().split(' ');

    var forguser = msg.guild.member(msg.mentions.users.first());
    var reason = "Good behaviour";

    if(!forguser)
    {
      return msg.reply("Cannot find user!");
    }
    if(forguser.hasPermission("MANAGE_MESSAGES"))
    {
      return msg.reply("Cannot forgive this user!");
    }
    if(!warns[forguser.id])
    {
      return msg.reply("No warnings to forgive!");
    }

    if(warns[forguser.id])
    {
      if(warns[forguser.id].warns==0)
      {
        return msg.reply("Warning count is already 0!");
      }
      else if(warns[forguser.id].warns>0)
      {
        warns[forguser.id].warns--;
        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
          if(err)
          {
            console.log(err);
          }
        });
        var embed = new Discord.MessageEmbed()
        .setColor("#008000")
        .setFooter(msg.member.displayName, msg.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Forgiven** ${forguser} (${forguser.id})
        **Forgiven by:** ${msg.author}
        **Reason:** ${reason}`)
        .addField("Warning Count", warns[forguser.id].warns);

        //var channel = msg.member.guild.channels.cache.get("742074843935014992");
        var channel = msg.guild.channels.cache.find(channel => channel.name === "log")

        
        if(!channel)
        {
          return;
        }

        channel.send(embed)     
        msg.channel.send(embed);
      }
    }
  }
  else{
    msg.reply("You do not have the permission to do that!")
  }
  }
});
