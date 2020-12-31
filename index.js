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

function printFinalBlowsRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.FinalBlows]);
	ary.push([dhingstats.Title, dhingstats.FinalBlows]);
	ary.push([edstats.Title, edstats.FinalBlows]);
	ary.push([idastats.Title, idastats.FinalBlows]);
	ary.push([loonstats.Title, loonstats.FinalBlows]);
	ary.push([milchstats.Title, milchstats.FinalBlows]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	message.channel.send('Final Blows Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printCriticalHitsRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.CriticalHits]);
	ary.push([dhingstats.Title, dhingstats.CriticalHits]);
	ary.push([edstats.Title, edstats.CriticalHits]);
	ary.push([idastats.Title, idastats.CriticalHits]);
	ary.push([loonstats.Title, loonstats.CriticalHits]);
	ary.push([milchstats.Title, milchstats.CriticalHits]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	message.channel.send('Critical Hits Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printAttacksRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.Attacks]);
	ary.push([dhingstats.Title, dhingstats.Attacks]);
	ary.push([edstats.Title, edstats.Attacks]);
	ary.push([idastats.Title, idastats.Attacks]);
	ary.push([loonstats.Title, loonstats.Attacks]);
	ary.push([milchstats.Title, milchstats.Attacks]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	message.channel.send('Attacks Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printAttacksLandedRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.AttacksLanded]);
	ary.push([dhingstats.Title, dhingstats.AttacksLanded]);
	ary.push([edstats.Title, edstats.AttacksLanded]);
	ary.push([idastats.Title, idastats.AttacksLanded]);
	ary.push([loonstats.Title, loonstats.AttacksLanded]);
	ary.push([milchstats.Title, milchstats.AttacksLanded]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	message.channel.send('Attacks Landed Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printSpellsCastRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.SpellsCast]);
	ary.push([dhingstats.Title, dhingstats.SpellsCast]);
	ary.push([edstats.Title, edstats.SpellsCast]);
	ary.push([idastats.Title, idastats.SpellsCast]);
	ary.push([loonstats.Title, loonstats.SpellsCast]);
	ary.push([milchstats.Title, milchstats.SpellsCast]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	message.channel.send('Spells Cast Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printDamageDealtRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.DamageDealt]);
	ary.push([dhingstats.Title, dhingstats.DamageDealt]);
	ary.push([edstats.Title, edstats.DamageDealt]);
	ary.push([idastats.Title, idastats.DamageDealt]);
	ary.push([loonstats.Title, loonstats.DamageDealt]);
	ary.push([milchstats.Title, milchstats.DamageDealt]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	message.channel.send('Damage Dealt Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printSingleRoundDamageRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.PeakDamage]);
	ary.push([dhingstats.Title, dhingstats.PeakDamage]);
	ary.push([edstats.Title, edstats.PeakDamage]);
	ary.push([idastats.Title, idastats.PeakDamage]);
	ary.push([loonstats.Title, loonstats.PeakDamage]);
	ary.push([milchstats.Title, milchstats.PeakDamage]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	message.channel.send('Single Round Damage Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printHealingRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.HealingDone]);
	ary.push([dhingstats.Title, dhingstats.HealingDone]);
	ary.push([edstats.Title, edstats.HealingDone]);
	ary.push([idastats.Title, idastats.HealingDone]);
	ary.push([loonstats.Title, loonstats.HealingDone]);
	ary.push([milchstats.Title, milchstats.HealingDone]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	message.channel.send('Healing Done Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printBlocksRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.Blocks]);
	ary.push([dhingstats.Title, dhingstats.Blocks]);
	ary.push([edstats.Title, edstats.Blocks]);
	ary.push([idastats.Title, idastats.Blocks]);
	ary.push([loonstats.Title, loonstats.Blocks]);
	ary.push([milchstats.Title, milchstats.Blocks]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	message.channel.send('Blocks Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printDamageTakenRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.DamageTaken]);
	ary.push([dhingstats.Title, dhingstats.DamageTaken]);
	ary.push([edstats.Title, edstats.DamageTaken]);
	ary.push([idastats.Title, idastats.DamageTaken]);
	ary.push([loonstats.Title, loonstats.DamageTaken]);
	ary.push([milchstats.Title, milchstats.DamageTaken]);
	ary.sort(function(a, b){ return a[1] - b[1] });
	message.channel.send('Damage Taken Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printNearDeathsRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.NearDeaths]);
	ary.push([dhingstats.Title, dhingstats.NearDeaths]);
	ary.push([edstats.Title, edstats.NearDeaths]);
	ary.push([idastats.Title, idastats.NearDeaths]);
	ary.push([loonstats.Title, loonstats.NearDeaths]);
	ary.push([milchstats.Title, milchstats.NearDeaths]);
	ary.sort(function(a, b){ return a[1] - b[1] });
	message.channel.send('Near Deaths Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
}

function printRevivesRank(message){
	var ary = [];
	ary.push([babestats.Title, babestats.Revives]);
	ary.push([dhingstats.Title, dhingstats.Revives]);
	ary.push([edstats.Title, edstats.Revives]);
	ary.push([idastats.Title, idastats.Revives]);
	ary.push([loonstats.Title, loonstats.Revives]);
	ary.push([milchstats.Title, milchstats.Revives]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	message.channel.send('Revives Leaderboard');
	for(var i=0;i<ary.length;i++){
		message.channel.send(ary[i][0]+':   '+ary[i][1]);
	}
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
			message.channel.send('Error: invalid stat request. Type \'!h\' for help');
		}
	}else if(message.content.charAt(1) === 'r'){
		if(command === 'finalblows'){
			printFinalBlowsRank(message);
		}else if(command === 'criticalhits'){
			printCriticalHitsRank(message);
		}else if(command === 'attacks'){
			printAttacksRank(message);
		}else if(command === 'attackslanded'){
			printAttacksLandedRank(message);
		}else if(command === 'attackaccuracy'){
			printAttackAccuracyRank(message);
		}else if(command === 'spellscast'){
			printSpellsCastRank(message);
		}else if(command === 'damagedealt'){
			printDamageDealtRank(message);
		}else if(command === 'singlerounddamage'){
			printSingleRoundDamageRank(message);
		}else if(command === 'healing'){
			printHealingRank(message);
		}else if(command === 'blocks'){
			printBlocksRank(message);
		}else if(command === 'damagetaken'){
			printDamageTakenRank(message);
		}else if(command === 'neardeaths'){
			printNearDeathsRank(message);
		}else if(command === 'revives'){
			printRevivesRank(message);
		}else{
			message.channel.send('Error: invalid rank request. Type \'!h\' for help');
		}
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
