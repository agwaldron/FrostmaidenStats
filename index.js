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

function printBabe(message){
	message.channel.send(babestats.Title);
	message.channel.send('Final blows: '+babestats.FinalBlows);
	message.channel.send('Critical hits: '+babestats.CriticalHits);
	message.channel.send('Attacks: '+babestats.Attacks);
	message.channel.send('Attacks Landed: '+babestats.AttacksLanded);
	var accuracy = Math.floor((babestats.AttacksLanded / babestats.Attacks) * 100);
	message.channel.send('Attack accuracy: '+accuracy+'%');
	message.channel.send('Spells Cast: '+babestats.SpellsCast);
	message.channel.send('Damage Dealt: '+babestats.DamageDealt);
	message.channel.send('Most damage in single round: '+babestats.PeakDamage);
	message.channel.send('Healing Done: '+babestats.HealingDone);
	message.channel.send('Blocks: '+babestats.Blocks);
	message.channel.send('Damage Taken: '+babestats.DamageTaken);
	message.channel.send('Near Deaths: '+babestats.NearDeaths);
	message.channel.send('Revives: '+babestats.Revives);
	message.channel.send('Warning: All stats are subject to drunken, human error');
}

function printDhing(message){
	message.channel.send(dhingstats.Title);
	message.channel.send('Final blows: '+dhingstats.FinalBlows);
	message.channel.send('Critical hits: '+dhingstats.CriticalHits);
	message.channel.send('Attacks: '+dhingstats.Attacks);
	message.channel.send('Attacks Landed: '+dhingstats.AttacksLanded);
	var accuracy = Math.floor((dhingstats.AttacksLanded / dhingstats.Attacks) * 100);
	message.channel.send('Attack accuracy: '+accuracy+'%');
	message.channel.send('Spells Cast: '+dhingstats.SpellsCast);
	message.channel.send('Damage Dealt: '+dhingstats.DamageDealt);
	message.channel.send('Most damage in single round: '+dhingstats.PeakDamage);
	message.channel.send('Healing Done: '+dhingstats.HealingDone);
	message.channel.send('Blocks: '+dhingstats.Blocks);
	message.channel.send('Damage Taken: '+dhingstats.DamageTaken);
	message.channel.send('Near Deaths: '+dhingstats.NearDeaths);
	message.channel.send('Revives: '+dhingstats.Revives);
	message.channel.send('Warning: All stats are subject to drunken, human error');
}

function printEd(message){
	message.channel.send(edstats.Title);
	message.channel.send('Final blows: '+edstats.FinalBlows);
	message.channel.send('Critical hits: '+edstats.CriticalHits);
	message.channel.send('Attacks: '+edstats.Attacks);
	message.channel.send('Attacks Landed: '+edstats.AttacksLanded);
	var accuracy = Math.floor((edstats.AttacksLanded / edstats.Attacks) * 100);
	message.channel.send('Attack accuracy: '+accuracy+'%');
	message.channel.send('Spells Cast: '+edstats.SpellsCast);
	message.channel.send('Damage Dealt: '+edstats.DamageDealt);
	message.channel.send('Most damage in single round: '+edstats.PeakDamage);
	message.channel.send('Healing Done: '+edstats.HealingDone);
	message.channel.send('Blocks: '+edstats.Blocks);
	message.channel.send('Damage Taken: '+edstats.DamageTaken);
	message.channel.send('Near Deaths: '+edstats.NearDeaths);
	message.channel.send('Revives: '+edstats.Revives);
	message.channel.send('Echoes Summoned: '+edstats.Echoes);
	message.channel.send('Warning: All stats are subject to drunken, human error');
}

function printIda(message){
	message.channel.send(idastats.Title);
	message.channel.send('Final blows: '+idastats.FinalBlows);
	message.channel.send('Critical hits: '+idastats.CriticalHits);
	message.channel.send('Attacks: '+idastats.Attacks);
	message.channel.send('Attacks Landed: '+idastats.AttacksLanded);
	var accuracy = Math.floor((idastats.AttacksLanded / idastats.Attacks) * 100);
	message.channel.send('Attack accuracy: '+accuracy+'%');
	message.channel.send('Spells Cast: '+idastats.SpellsCast);
	message.channel.send('Damage Dealt: '+idastats.DamageDealt);
	message.channel.send('Most damage in single round: '+idastats.PeakDamage);
	message.channel.send('Healing Done: '+idastats.HealingDone);
	message.channel.send('Blocks: '+idastats.Blocks);
	message.channel.send('Damage Taken: '+idastats.DamageTaken);
	message.channel.send('Near Deaths: '+idastats.NearDeaths);
	message.channel.send('Revives: '+idastats.Revives);
	message.channel.send('Balance Restored: '+idastats.Balance);
	message.channel.send('Warning: All stats are subject to drunken, human error');
}

function printLoon(message){
	message.channel.send(loonstats.Title);
	message.channel.send('Final blows: '+loonstats.FinalBlows);
	message.channel.send('Critical hits: '+loonstats.CriticalHits);
	message.channel.send('Attacks: '+loonstats.Attacks);
	message.channel.send('Attacks Landed: '+loonstats.AttacksLanded);
	var accuracy = 0;
	message.channel.send('Attack accuracy: '+accuracy+'%');
	message.channel.send('Spells Cast: '+loonstats.SpellsCast);
	message.channel.send('Damage Dealt: '+loonstats.DamageDealt);
	message.channel.send('Most damage in single round: '+loonstats.PeakDamage);
	message.channel.send('Healing Done: '+loonstats.HealingDone);
	message.channel.send('Blocks: '+loonstats.Blocks);
	message.channel.send('Damage Taken: '+loonstats.DamageTaken);
	message.channel.send('Near Deaths: '+loonstats.NearDeaths);
	message.channel.send('Revives: '+loonstats.Revives);
	message.channel.send('Warning: All stats are subject to drunken, human error');
}

function printMilch(message){
	message.channel.send(milchstats.Title);
	message.channel.send('Final blows: '+milchstats.FinalBlows);
	message.channel.send('Critical hits: '+milchstats.CriticalHits);
	message.channel.send('Attacks: '+milchstats.Attacks);
	message.channel.send('Attacks Landed: '+milchstats.AttacksLanded);
	var accuracy = Math.floor((milchstats.AttacksLanded / milchstats.Attacks) * 100);
	message.channel.send('Attack accuracy: '+accuracy+'%');
	message.channel.send('Spells Cast: '+milchstats.SpellsCast);
	message.channel.send('Damage Dealt: '+milchstats.DamageDealt);
	message.channel.send('Most damage in single rond: '+milchstats.PeakDamage);
	message.channel.send('Healing Done: '+milchstats.HealingDone);
	message.channel.send('Blocks: '+milchstats.Blocks);
	message.channel.send('Damage Taken: '+milchstats.DamageTaken);
	message.channel.send('Near Deaths: '+milchstats.NearDeaths);
	message.channel.send('Revives: '+milchstats.Revives);
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
			printBabe(message);
		}else if(command === 'dhing' || command === 'dhingbaat'){
			printDhing(message);
		}else if(command === 'eddryn' || command === 'eddrynpalestray'){
			printEd(message);
		}else if(command === 'ida' || command === 'idakaron'){
			printIda(message);
		}else if(command === 'loon' || command === 'loonirakame'){
			printLoon(message);
		}else if(command === 'milch' || command === 'milchmacornhole'){
			printMilch(message);
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
