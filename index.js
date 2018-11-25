const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
 console.log(Date.now() + " Just got pinged!");
 response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
 http.get(`http://https://big-banana-no-et.glitch.me/`);
}, 280000);


// Loads Discord.js and other const
const Discord = require('discord.js');
const Util = require('discord.js');
const ytdl = require("ytdl-core");
const ffmpeg = require('ffmpeg');
const YouTube = require('simple-youtube-api');
const ms = require('ms');
var fs = require("fs");
//Set Bot names
const Bot = new Discord.Client();

// Load up Config file
const BKM = require("./BKM.json")

// Sets Bot Token to configure
Bot.login(process.env.BOT_TOKEN);

Bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${Bot.users.size} users, in ${Bot.channels.size} channels of ${Bot.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `Bot.user` is what the
  // docs refer to as the "BotUser".
  client.user.setPresence({
        game: { 
            name: 'the lord T1m#7219',
            type: 'WATCHING'
        },
  
    })
  Bot.user.setStatus("Online");
});

Bot.on("message", async message => {
  if(message.author.bot) return;
    console.log(message.content)
    const mes = message.content.toLowerCase();
    const res = mes.substring(0, 2);
    console.log(message.channel.name)
    if (message === "despacito") {
      message.reply("you are a true man of pure interlect. https://t0.rbxcdn.com/1d5a411fd5528f7fcc345e53fc727704")
    };
    if(res===";;" || mes.substring(0,1)==="!" || res==="b!") {
       if (message.channel.name!=="music-bot-commands" && message.channel.name!=="bot-commands" && message.channel.name!=="administrator-chat" ){
        const fetched = await message.channel.fetchMessages({limit: 2});
        message.channel.bulkDelete(fetched)
        let bonelessChannel = message.guild.channels.find('name', 'incidents')
        bonelessChannel.send(`${message.author} did a bot command in ${message.channel.name}! (${message.content}) Cleaned it up tho`)
      };
    };
    if(res!== "b!") return;
    const mainmess = mes.substr(2);
    const spl = mainmess.split(" ");
    console.log(spl,spl[0])
    if(spl[0] === "purge") {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        const deleteCount = parseInt(spl[1], 10)+1;
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    };
    if(spl[0] === "kick") {
     console.log("A KICK??");
     let kUser = message.guild.member(message.mentions.users.first());
     if(!kUser) return message.channel.send("Can't find user!");
     let kReason = spl.slice(2);
     console.log(kReason);
     if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Not enough perms bucko!");
     if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");
     let kickChannel = message.guild.channels.find('name', "incidents");
     if(!kickChannel) return message.channel.send("Can't find incidents channel.");
     const embed = {
  "title": "~Kick~",
  "description": "Oh no! Someone got kicked!",
  "color": 4903271,
  "footer": {
    "text": "Made by my man T1m#7219"
  },
  "fields": [
    {
      "name": "Kicked User",
      "value": `${kUser} with ID ${kUser.id}`
    },
    {
      "name": "Kicked By",
      "value": `<@${message.author.id}> with ID ${message.author.id}`
    },
    {
      "name": "Kicked In",
      "value": `${message.channel}`,
      "inline": true
    },
    {
      "name": "Time",
      "value": `${message.createdAt}`,
      "inline": true
    },
    {
      "name": "Reason",
      "value": `${kReason}`,
      "inline": true
    }
  ]
};
        
     message.guild.member(kUser).kick(kReason);
     console.log(kUser, kReason)
     kickChannel.send({ embed }+ "Just kicked "+ kUser +" for "+kReason);
     var kUserID = kUser.id;
      if(!BKM[kUserID]){
      BKM[kUserID] = {
        bans: 0,
        kicks: 1,
        mutes: 0
      };
     } else {
        BKM[kUserID].kicks+=1;
     };
      fs.writeFile("./BKM.json", BKM[kUserID], (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
    };
    if(spl[0] === "ban") {
     let bUser = message.guild.member(message.mentions.users.first());
     if(!bUser) return message.channel.send("Can't find user!");
     let bReason = spl.slice(2);
     if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
     if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be kicked!");
     const embed = {
  "title": "~Ban~",
  "description": "Oops! That's a ban!",
  "color": 4903271,
  "footer": {
    "text": "01000001 01101100 01101100 00100000 01101000 01100001 01101001 01101100 00100000 01101100 01101111 01110010 01100100 00100000 01010100 00110001 01101101"
  },
  "fields": [
    {
      "name": "Banned User",
      "value": `${bUser} with ID ${bUser.id}`
    },
    {
      "name": "Banned By",
      "value": `<@${message.author.id}> with ID ${message.author.id}`
    },
    {
      "name": "Banned In",
      "value": `${message.channel}`,
      "inline": true
    },
    {
      "name": "Time",
      "value": `${message.createdAt}`,
      "inline": true
    },
    {
      "name": "Reason",
      "value": `${bReason}`,
      "inline": true
    }
  ]
};
        
     let incidentchannel = message.guild.channels.find('name', "incidents");
     if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

     message.guild.member(bUser).ban(bReason);
     incidentchannel.send({ embed }+"Just kicked "+ bUser +" for "+bReason);
     var bUserID = bUser.id;
     if(!BKM[bUserID]){
      BKM[bUserID] = {
        bans: 1,
        kicks: 0,
        mutes: 0
      };
     } else {
        BKM[bUserID].bans+=1;
     };
    fs.writeFile("./BKM.json", BKM[bUserID], (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

    };
   if(spl[0]==="history"){
    let hUser = message.guild.member(message.mentions.users.first());
    var hUserID=hUser.id;
    if(!BKM[hUserID]){
      BKM[hUserID] = {
        bans: 0,
        kicks: 0,
        mutes: 0
      };
      fs.writeFile("./BKM.json", BKM[hUserID], (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
    };
    
     var hBans = BKM[hUserID].bans;
     var hKicks = BKM[hUserID].kicks;
     var hMutes = BKM[hUserID].mutes;
    const embed = {
  "title": "~History~",
  "description": "Oooh! Who's been naughty?",
  "color": 4903271,
  "footer": {
    "text": "01000010 01100101 01111010 00100000 01101001 01110011 00100000 01110110 01100101 01110010 01111001 00100000 01100010 01100001 01100100"
  },
  "author": {
    "name": "Boneless Water",
    "icon_url": "https://cdn.discordapp.com/attachments/314470306703998979/507223045136449536/52JC3VVE.png"
  },
  "fields": [
    {
      "name": "History of User",
      "value": `${hUser} with ID ${hUser.id}`
    },
    {
      "name": "Bans",
      "value": `${hBans}`,
      "inline": true
    },
    {
      "name": "Kicks",
      "value": `${hKicks}`,
      "inline": true
    },
    {
      "name": "Mutes",
      "value": `${hMutes}`,
      "inline": true
    }
  ]
};
    
    message.channel.send({ embed });
   };
   if(spl[0]==="mute") {
    let tomute = message.guild.member(message.mentions.users.first());
  if(!tomute) return message.reply("Couldn't find user.");
  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("you don't have enough permissions!")
  if(tomute.hasPermission("MUTE_MEMBERS")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = spl[2];
  if(!mutetime) return message.reply("You didn't specify a time!");
  let muteMH = spl[3];
  if(!muteMH) spl[3] = "m"
  await(tomute.addRole(muterole.id));
  let multiplier = 6000
  if(muteMH === "m" || muteMH === "min" || muteMH === "mins" || muteMH === "minutes"){
    multiplier = 6000
    message.reply(`<@${tomute.id}> has been muted for ${mutetime} minutes`);
    } else if(muteMH === "h" || muteMH === "hours" || muteMH === "hour") {
      multiplier = multiplier * 60
      message.reply(`<@${tomute.id}> has been muted for ${mutetime} hours`);
    } else {
      message.reply("no time frame given (Minutes/Hours), assuming minutes!")
      multiplier = 6000
      message.reply(`<@${tomute.id}> has been muted for ${mutetime} minutes`);
    }
  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, mutetime*multiplier);
     var tomuteID = tomute.id;
     if(!BKM[tomuteID]){
      BKM[tomuteID] = {
        bans: 0,
        kicks: 0,
        mutes: 1
      };
     } else {
        BKM[kUserID].mutes+=1;
     };
  fs.writeFile("./BKM.json", BKM[kUserID], (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
   };
  if(spl[0]==="help") {
      const embed = {
  "title": "~Help~",
  "description": "Awwww. Does someone need help?",
  "color": 4903271,
  "footer": {
    "text": "Made by my man T1m#7219"
  },
  "fields": [
    {
      "name": "Ban {@user}",
      "value": "Bans someone (duh)",
       "inline": true
    },
    {
      "name": "Kick {@user}",
      "value": "Kicks someone (obviously)",
       "inline": true
    },
    {
      "name": "Mute {@user} {time}",
      "value": "Mutes someone for a time (you getting it yet?)",
      "inline": true
    },
    {
      "name": "Purge {number of messages}",
      "value": "Removes {number of messages} messages",
      "inline": true
    },
    {
      "name": "History {@user}",
      "value": "Shows the bans, kicks, and mutes of the user",
      "inline": true
    },
    {
      "name": "Lockdown {time}",
      "value": "Makes basic users (probably you) unable to speak for {time} in the channel",
      "inline": true
    },
    {
      "name": "Play {link/search}",
      "value": "Searches for the given song and plays it if in vc",
      "inline": true
    },
    {
      "name": "Skip",
      "value": "Skips current song",
      "inline": true
    },
    {
      "name": "Volume {number}",
      "value": "Changes or shows current volume",
      "inline": true
    },
    {
      "name": "NP",
      "value": "Shows current song",
      "inline": true
    },
    {
      "name": "Stop",
      "value": "Clears current queue",
      "inline": true
    },
    {
      "name": "Pause",
      "value": "Pauses song & queue",
      "inline": true
    },
    {
      "name": "Resume",
      "value": "Resumes playing song & queue",
      "inline": true
    },
    {
      "name": "Skip",
      "value": "Skips current song",
      "inline": true
    },
    {
      "name": "Prefix",
      "value": "BTW the prefix is b! or B!",
      "inline": true
    }
  ]
};
  message.channel.send({ embed });
  };
// Music bot
  if(spl[0]==="nuke") {
    let modRole = message.guild.roles.find('name', 'Rational');
    let irratRole = message.guild.roles.find('name', 'Irrational');
    let kotrtRole = message.guild.roles.find('name', 'Knights of the Round Table');
    let MGRole = message.guild.roles.find('name', 'Machine God');
    if (!message.member.roles.has(modRole.id) || !message.member.roles.has(irratRole.id)) {
        return message.reply('sorry, but no nukes for you );').catch(console.error);
    }
    for (let [k, v] of message.guild.members) {
      if(!v.roles.find("name", "Irrational") || !v.roles.find("name", "Rational") || !v.roles.find("name", "Knights of the Round Table") || !v.roles.find("name", "Machine God")){
          message.guild.member(v).kick("Sorry fam, you got nuked :/");
      }
}
  };
  if(spl[0]==="lockdown") {
  if (!client.lockit) client.lockit = [];
    let time = spl[1];
    let validUnlocks = ['release', 'unlock'];
    let modRole = message.guild.roles.find('name', 'Rational');
    let irratRole = message.guild.roles.find('name', 'Irrational');
    let kotrtRole = message.guild.roles.find('name', 'Knights of the Round Table');
    let MGRole = message.guild.roles.find('name', 'Machine God');
    if (!message.member.roles.has(modRole.id) || !message.member.roles.has(irratRole.id)) {
        return message.reply('this is not the command you are looking for').catch(console.error);
    }
    if (!time) return message.reply('you must set a duration for the lockdown.');
    let muteMH = spl[3];
    let multiplier = 6000;
    let mh = "minutes"
  if(muteMH === "m" || muteMH === "min" || muteMH === "mins" || muteMH === "minutes"){
    multiplier = 6000;
    let mh = "minutes"
    } else if(muteMH === "h" || muteMH === "hours" || muteMH === "hour") {
      multiplier = multiplier * 60
      let mh = "hours"
    } else {
      message.reply("no time frame given (Minutes/Hours), assuming minutes!")
      multiplier = 6000
      let mh = "minutes"
    }
    if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.g, {
            SEND_MESSAGES: null
        }).then(() => {
            message.channel.sendMessage(':unlock: **Lockdown lifted.**');
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
            console.log(error);
        });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.send(`:lock: **Channel locked** for ${time} ${mh}.`).then(() => {
                message.channel.overwritePermissions(modRole, {
                    SEND_MESSAGES: true
                })
                message.channel.overwritePermissions(irratRole, {
                    SEND_MESSAGES: true
                })
                message.channel.overwritePermissions(kotrtRole, {
                    SEND_MESSAGES: true
                })
                message.channel.overwritePermissions(MGRole, {
                    SEND_MESSAGES: true
                })
                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null
                    }).then(message.channel.send(':unlock: **Lockdown lifted.**')).catch(console.error);
                    delete client.lockit[message.channel.id];
                }, ms(time)*multiplier);

            }).catch(error => {
                console.log(error);
            });
        });
    }
  };


});
const queue = new Map();
const youtube = new YouTube("AIzaSyBXgeFW5_j7T6bO4-NJdHN9H8UNJGeNZoM");
const client=Bot
client.on('message', async msg => { // eslint-disable-line
  const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
  const mes = msg.content.toLowerCase();
  const res = mes.substring(0, 2);
  const mainmess = mes.substr(2);
  const spl = mainmess.split(" ");
	let command = msg.content.toLowerCase().split(' ')[0];
	command = spl[0]

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}