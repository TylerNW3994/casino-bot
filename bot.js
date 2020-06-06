const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
import CONFIG from "./config.js";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const PREFIX = "!csn";

client.on('message', msg => {
	var args = msg.content.split(" ");
	var command = args[0].toLowerCase();
	var author = msg.author.toString();
	
	//User is not trying to access this bot's commands
	if(command.substring(0, PREFIX.length) != PREFIX){
		return false; 
	}
	
	//Remove prefix for easy reading
	command = command.substring(PREFIX.length, command.length);
	
	//User is accessing this bot's commands
	if(command == "help"){
		const EMBED = new MessageEmbed()
			.setTitle("TestTitle")
			.setColor(0x0000ff)
			.setDescription("TestDescription");
		msg.channel.send(EMBED);
	}
});
console.log(client);
client.login(CONFIG.KEY);