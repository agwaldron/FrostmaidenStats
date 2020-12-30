const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

const statsprefix = '!s';
const rankprefix = '!r';
const helpprefix = '!h';

var loginstring = '';

var babestats = {
	Title: 'Babe The Gladiator',
	FinalBlows: 2,
	CriticalHits: 1,
	Attacks: 4,
	AttacksLanded: 2,
	SpellsCast: 0,
	DamageDealt: 19,
	PeakDamage: 10,
	HealingDone: 6,
	Blocks: 0,
	DamageTaken: 0,
	NearDeaths: 0,
	Revives: 0
}

var dhingstats = {
	Title: 'Dhing Baat The Kitty Cat',
	FinalBlows: 2,
	CriticalHits: 0,
	Attacks: 7,
	AttacksLanded: 3,
	SpellsCast: 1,
	DamageDealt: 29,
	PeakDamage: 15,
	HealingDone: 0,
	Blocks: 0,
	DamageTaken: 0,
	NearDeaths: 0,
	Revives: 0
}

var edstats = {
	Title: 'Eddryn Palestray The Yeti Child',
	FinalBlows: 1,
	CriticalHits: 1,
	Attacks: 7,
	AttacksLanded: 3,
	SpellsCast: 0,
	DamageDealt: 32,
	PeakDamage: 17,
	HealingDone: 11,
	Blocks: 0,
	DamageTaken: 25,
	NearDeaths: 0,
	Revives: 0,
	Echoes: 3
}

var idastats = {
	Title: 'Ida Karon The Fish Finder',
	FinalBlows: 1,
	CriticalHits: 0,
	Attacks: 5,
	AttacksLanded: 2,
	SpellsCast: 3,
	DamageDealt: 14,
	PeakDamage: 14,
	HealingDone: 0,
	Blocks: 0,
	DamageTaken: 3,
	NearDeaths: 0,
	Revives: 1,
	Balance: 0
}

var loonstats = {
	Title: 'Loon Irakame The Cursed',
	FinalBlows: 0,
	CriticalHits: 0,
	Attacks: 1,
	AttacksLanded: 0,
	SpellsCast: 0,
	DamageDealt: 0,
	PeakDamage: 0,
	HealingDone: 0,
	Blocks: 1,
	DamageTaken: 19,
	NearDeaths: 1,
	Revives: 0
}

var milchstats = {
	Title: 'Milch Macornhole The Mover And Shaker',
	FinalBlows: 2,
	CriticalHits: 0,
	Attacks: 2,
	AttacksLanded: 1,
	SpellsCast: 4,
	DamageDealt: 25,
	PeakDamage: 9,
	HealingDone: 13,
	Blocks: 0,
	DamageTaken: 0,
	NearDeaths: 0,
	Revives: 0
}

function printPlayerStats(message, player){
	message.channel.send(player.Title);
	message.channel.send('Final blows: '+player.FinalBlows);
	message.channel.send('Critical hits: '+player.CriticalHits);
	message.channel.send('Attacks: '+player.Attacks);
	message.channel.send('Attacks Landed: '+player.AttacksLanded);
	var accuracy = Math.floor((player.AttacksLanded / player.Attacks) * 100);
	if (player === loonstats) { accuracy = 0; }
	message.channel.send('Attack accuracy: '+accuracy+'%');
	message.channel.send('Spells Cast: '+player.SpellsCast);
	message.channel.send('Damage Dealt: '+player.DamageDealt);
	message.channel.send('Most damage in single rond: '+player.PeakDamage);
	message.channel.send('Healing Done: '+player.HealingDone);
	message.channel.send('Blocks: '+player.Blocks);
	message.channel.send('Damage Taken: '+player.DamageTaken);
	message.channel.send('Near Deaths: '+milchstats.NearDeaths);
	message.channel.send('Revives: '+player.Revives);
	if(player === edstats){
		message.channel.send('Echoes summoned: '+player.Echoes);
	}else if(player === idastats){
		message.channel.send('Balance restored: '+player.Balance);
	}
	message.channel.send('Warning: All stats are subject to drunken, human error');
}

function printParty(message){
	message.channel.send('Combined Party Stats');
	var fbstat = babestats.FinalBlows + dhingstats.FinalBlows + edstats.FinalBlows + idastats.FinalBlows + loonstats.FinalBlows + milchstats.FinalBlows;
	message.channel.send('Final blows: '+fbstat);
	var crstat = babestats.CriticalHits + dhingstats.CriticalHits + edstats.CriticalHits + idastats.CriticalHits + loonstats.CriticalHits + milchstats.CriticalHits;
	message.channel.send('Critical hits: '+crstat);
	var astat = babestats.Attacks + dhingstats.Attacks + edstats.Attacks + idastats.Attacks + loonstats.Attacks + milchstats.Attacks;
	message.channel.send('Attacks: '+astat);
	var alstat = babestats.AttacksLanded + dhingstats.AttacksLanded + edstats.AttacksLanded + idastats.AttacksLanded + milchstats.AttacksLanded;
	message.channel.send('Attacks Landed: '+alstat);
	var accuracy = Math.floor((alstat / astat) * 100);
	message.channel.send('Attack accuracy: '+accuracy+'%');
	var sstat = babestats.SpellsCast + dhingstats.SpellsCast + edstats.SpellsCast + idastats.SpellsCast + loonstats.SpellsCast + milchstats.SpellsCast;
	message.channel.send('Spells cast: '+sstat);
	var dstat = babestats.DamageDealt + dhingstats.DamageDealt + edstats.DamageDealt + idastats.DamageDealt + loonstats.DamageDealt + milchstats.DamageDealt;
	message.channel.send('Damage dealt: '+dstat);
	var hstat = babestats.HealingDone + dhingstats.HealingDone + edstats.HealingDone + idastats.HealingDone + loonstats.HealingDone + milchstats.HealingDone;
	message.channel.send('Healing done: '+hstat);
	var bstat = babestats.Blocks + dhingstats.Blocks + edstats.Blocks + idastats.Blocks + loonstats.Blocks + milchstats.Blocks;
	message.channel.send('Blocks: '+bstat);
	var dtstat = babestats.DamageTaken + dhingstats.DamageTaken + edstats.DamageTaken + idastats.DamageTaken + loonstats.DamageTaken + milchstats.DamageTaken;
	message.channel.send('Damage Taken: '+dtstat);
	var ndstat = babestats.NearDeaths + dhingstats.NearDeaths + edstats.NearDeaths + idastats.NearDeaths + loonstats.NearDeaths + milchstats.NearDeaths;
	message.channel.send('Near Deaths: '+ndstat);
	var rstat = babestats.Revives + dhingstats.Revives + edstats.Revives + idastats.Revives + loonstats.Revives + milchstats.Revives;
	message.channel.send('Revives: '+rstat);
	message.channel.send('Warning: All stats are subject to drunken, human error');
}	

function printRank(message){
	message.channel.send('Ranks not implemented yet');
}

function printHelp(message){
	message.channel.send('Rime of the Frostmaiden Stat Bot Help');
	message.channel.send('<----------------------------------->');
	message.channel.send('Stats');
	message.channel.send('- !s followed by command');
	message.channel.send('- command can be a party members name to print their stats');
	message.channel.send('- command can be \'party\' to print the party\'s combined stats');
	message.channel.send('<----------------------------------->');
	message.channel.send('Rank');
	message.channel.send('- coming soon');
	message.channel.send('<----------------------------------->');
	message.channel.send('Help');
	message.channel.send('- !h');
	message.channel.send('- lists available commands');
	message.channel.send('<----------------------------------->');
	message.channel.send('Remember to stay warm out there!');
}


client.once('ready', () => {
	console.log('Stat bot running');
});

client.on('message', message => {
	if(!message.content.startsWith(statsprefix) && !message.content.startsWith(rankprefix) && !message.content.startsWith(helpprefix)){ return; }

	const command = message.content.slice(rankprefix.length).toLowerCase().split(' ').join('');

	if(message.content.charAt(1) === 's'){
		if(command === 'babe'){
			printPlayerStats(message, babestats);
		}else if(command === 'dhing' || command === 'dhingbaat'){
			printPlayerStats(message, dhingstats);
		}else if(command === 'eddryn' || command === 'eddrynpalestray'){
			printPlayerStats(message, edstats);
		}else if(command === 'ida' || command === 'idakaron'){
			printPlayerStats(message, idastats);
		}else if(command === 'loon' || command === 'loonirakame'){
			printPlayerStats(message, loonstats);
		}else if(command === 'milch' || command === 'milchmacornhole'){
			printPlayerStats(message, milchstats);
		}else if(command === 'party'){
			printParty(message);
		}else{
			message.channel.send('Error: invalid stat request');
		}
	}else if(message.content.charAt(1) === 'r'){
		printRank(message);
	}else {
		printHelp(message);
	}
});

fs.readFile('data/login.txt', (err, data) => {
	if(err) throw err;

	loginstring = data.toString();
	loginstring = loginstring.trim();
	client.login(loginstring);
});
