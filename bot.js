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
			return false;
		}
		if(command == "getchips"){
			msg.reply(" " + Config.getChips(config));
			return false;
		}
		if(command == "adminhelp"){
			const EMBED = new MessageEmbed()
				.setTitle("Administrator Commands for Casino Bot")
				.setColor(0x992222)
				.setDescription("!csnChangeChips - Allows you to change the number of chips a player starts with anywhere from 1 to 1,000,000.\n" +
								"!csnGetChips - Allows you to see how many chips each player starts with.")
			msg.channel.send(EMBED);
			return false;
		}
	}
	
	//User is accessing this bot's commands
	if(command == "help"){
		const EMBED = new MessageEmbed()
			.setTitle("CasinoBot Help!")
			.setColor(0x0000ff)
			.setDescription("Hey there " +  author + "!  I'm the CasinoBot! \n " +
							"Here in the Discino, we promote family friendly fun!\n" +
							"Make sure you follow the rules set by your server administrators!\n\n" +
							"If you are an administrator on the server, you can type !csnAdminHelp to see the list of commands available for you to use!\n" +
							"We currently allow you to bet your chips in a game of slots, blackjack, and poker!  You can only play poker if you have at least one other person " +
							"with you!\n\n" +
							"Type !csnLeaderboard to see who has the most chips!\n\n" +
							"To play any of our games, type !csn followed by the game you want to play!\n" +
							"So if you want to play Slots, type !csnSlots");
		msg.channel.send(EMBED);
		return false;
	}
	
	//Users can invite other players.  Invites are not required to join.
	if(command == "invite"){
		if(msg.mentions.users.size){
			invited = msg.mentions.users.first();
			// User can't invite themselves.
			if(msg.author.toString().localeCompare(invited) == 0){
				var num = Math.floor((Math.random() * 10) + 1);
				var other = "";
				switch(num){
					case 1: other = "knitting"; break;
					case 2: other = "learn to read"; break;
					case 3: other = "crying"; break;
					case 4: other = "learning to speak Klingon"; break;
					case 5: other = "cooking with Gordon Ramsey"; break;
					case 6: other = "talking to a girl for once"; break;
					case 7: other = "making Minecraft using only HTML"; break;
					case 8: other = "building a house exclusively out of Lincoln Logs"; break;
					case 9: other = "proving Santa doesn\'t exist"; break;
					default: other = "jumping into a random Zoom call"; break;
				}
				msg.reply(" you can't invite yourself! Go try " + other + " instead!");
				return false;
			}
		}
		const EMBED = new MessageEmbed()
			.setTitle("You're Invited!")
			.setColor(0x660066)
			.setDescription(param + ", you\'re invited to play a game!  Want to play?");
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

function Game(players){
	this.players = players;
	this.pot = 0;
	
	this.addToPot = function(chips) {
		this.pot += chips;
	}
	
	this.getPot = function(){
		return this.pot;
	}
}

class PokerGame {
	
}
const config = new Config(500);

client.login("NzE4NDkyNzI3OTE4MDY3NzEy.XuEuHg.rJTvKAAZKxnqltkzY6BlirkEndo");