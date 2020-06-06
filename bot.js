const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const PREFIX = "!csn";

client.on('message', msg => {
	var args = msg.content.split(" ");
	var command = args[0].toLowerCase();
	var param = args[1];
	var author = msg.author.toString();
	
	//User is not trying to access this bot's commands
	if(command.substring(0, PREFIX.length) != PREFIX){
		return false; 
	}
	
	//Remove prefix for easy reading
	command = command.substring(PREFIX.length, command.length);
	
	//Check if the author is an admin trying to change config options
	if(msg.member.hasPermission("ADMINISTRATOR")){
		if(command == "changechips"){
			if(param >= 1 && param <= 1000000){
				Config.setChips(config,param);
				msg.reply(" awesome!  All players will start with " + param + " chips when they enter the casino!");
			}
			else
				msg.reply(" invalid parameter!");
		}
		if(command == "getchips")
			msg.reply(" " + Config.getChips(config));
	}
	
	//User is accessing this bot's commands
	if(command == "help"){
		const EMBED = new MessageEmbed()
			.setTitle("TestTitle")
			.setColor(0x0000ff)
			.setDescription("TestDescription");
		msg.channel.send(EMBED);
	}
});

class Player{
	constructor(name, discordID) {
		this.name = name;
		this.discordID = discordID;
		this.chips = config.chips;
	}
}

class Config{
	constructor(chips) {
		this.chips = chips;
	}
	
	static setChips(config, chips) {
		config.chips = chips;
	}
	
	static getChips(config) {
		return config.chips;
	}
}
const config = new Config(500);

client.login("NzE4NDkyNzI3OTE4MDY3NzEy.XtpqhA.Mj2F1iydobPrkbpgW1dVz34xq_o");