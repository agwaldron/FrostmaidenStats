const Discord = require('discord.js');
const client = new Discord.Client();

//const mariadb = require('mariadb/callback');
const fs = require('fs');

const statsprefix = '!s';
const rankprefix = '!r';
const helpprefix = '!h';

var babestats = {
	Title: 'Babe The Gladiator',
	FinalBlows: 10,
	CriticalHits: 4,
	Attacks: 63,
	AttacksLanded: 40,
	SpellsCast: 2,
	DamageDealt: 620,
	PeakDamage: 41,
	HealingDone: 12,
	Blocks: 16,
	DamageTaken: 281,
	NearDeaths: 1,
	Revives: 2
}

var dhingstats = {
	Title: 'Dhing Baat The Kitty Cat',
	FinalBlows: 11,
	CriticalHits: 2,
	Attacks: 53,
	AttacksLanded: 27,
	SpellsCast: 19,
	DamageDealt: 378,
	PeakDamage: 30,
	HealingDone: 26,
	Blocks: 15,
	DamageTaken: 150,
	NearDeaths: 3,
	Revives: 0
}

var edstats = {
	Title: 'Eddryn Palestray The Yeti Child',
	FinalBlows: 7,
	CriticalHits: 5,
	Attacks: 60,
	AttacksLanded: 47,
	SpellsCast: 0,
	DamageDealt: 503,
	PeakDamage: 35,
	HealingDone: 11,
	Blocks: 7,
	DamageTaken: 73,
	NearDeaths: 0,
	Revives: 0,
	Echoes: 19
}

var idastats = {
	Title: 'Ida Karon The Orc Commander',
	FinalBlows: 7,
	CriticalHits: 0,
	Attacks: 27,
	AttacksLanded: 13,
	SpellsCast: 47,
	DamageDealt: 226,
	PeakDamage: 20,
	HealingDone: 41,
	Blocks: 2,
	DamageTaken: 77,
	NearDeaths: 0,
	Revives: 3,
	Balance: 4
}

var longstats = {
	Title: 'Longinus Hest The Puppeteer',
	FinalBlows: 0,
	CriticalHits: 1,
	Attacks: 5,
	AttacksLanded: 3,
	SpellsCast: 2,
	DamageDealt: 98,
	PeakDamage: 58,
	HealingDone: 0,
	Blocks: 0,
	DamageTaken: 0,
	NearDeaths: 0,
	Revives: 0
}

var loonstats = {
	Title: 'Loon Irakame The Charred',
	FinalBlows: 12,
	CriticalHits: 3,
	Attacks: 77,
	AttacksLanded: 48,
	SpellsCast: 0,
	DamageDealt: 681,
	PeakDamage: 149,
	HealingDone: 6,
	Blocks: 9,
	DamageTaken: 179,
	NearDeaths: 3,
	Revives: 0
}

var milchstats = {
	Title: 'Milch Macornhole The Zealot',
	FinalBlows: 7,
	CriticalHits: 0,
	Attacks: 23,
	AttacksLanded: 16,
	SpellsCast: 47,
	DamageDealt: 476,
	PeakDamage: 83,
	HealingDone: 365,
	Blocks: 13,
	DamageTaken: 162,
	NearDeaths: 0,
	Revives: 1
}

function printPlayerStats(message, player){
	var response = '';
	response += player.Title+'\n';
	response += 'Final blows: '+player.FinalBlows+'\n';
	response += 'Critical hits: '+player.CriticalHits+'\n';
	response += 'Attacks: '+player.Attacks+'\n';
	response += 'Attacks Landed: '+player.AttacksLanded+'\n';
	var accuracy = Math.floor((player.AttacksLanded / player.Attacks) * 100);
	response += 'Attack accuracy: '+accuracy+'%\n';
	response += 'Spells Cast: '+player.SpellsCast+'\n';
	response += 'Damage Dealt: '+player.DamageDealt+'\n';
	response += 'Most damage in single round: '+player.PeakDamage+'\n';
	response += 'Healing Done: '+player.HealingDone+'\n';
	response += 'Blocks: '+player.Blocks+'\n';
	response += 'Damage Taken: '+player.DamageTaken+'\n';
	response += 'Near Deaths: '+player.NearDeaths+'\n';
	response += 'Revives: '+player.Revives+'\n';
	if(player === edstats){
		response += 'Echoes summoned: '+player.Echoes+'\n';
	}else if(player === idastats){
		response += 'Balance restored: '+player.Balance+'\n';
	}
	response += 'Warning: All stats are subject to drunken, human error\n';
	message.channel.send(response);
}

function printParty(message){
	var response = '';
	response += 'Combined Party Stats\n';
	var fbstat = babestats.FinalBlows + dhingstats.FinalBlows + edstats.FinalBlows + idastats.FinalBlows + longstats.FinalBlows + loonstats.FinalBlows + milchstats.FinalBlows;
	response += 'Final blows: '+fbstat+'\n';
	var crstat = babestats.CriticalHits + dhingstats.CriticalHits + edstats.CriticalHits + idastats.CriticalHits + longstats.CriticalHits + loonstats.CriticalHits + milchstats.CriticalHits;
	response += 'Critical hits: '+crstat+'\n';
	var astat = babestats.Attacks + dhingstats.Attacks + edstats.Attacks + idastats.Attacks + longstats.Attacks + loonstats.Attacks + milchstats.Attacks;
	response += 'Attacks: '+astat+'\n';
	var alstat = babestats.AttacksLanded + dhingstats.AttacksLanded + edstats.AttacksLanded + idastats.AttacksLanded + longstats.AttacksLanded + loonstats.AttacksLanded + milchstats.AttacksLanded;
	response += 'Attacks Landed: '+alstat+'\n';
	var accuracy = Math.floor((alstat / astat) * 100);
	response += 'Attack accuracy: '+accuracy+'%\n';
	var sstat = babestats.SpellsCast + dhingstats.SpellsCast + edstats.SpellsCast + idastats.SpellsCast + longstats.SpellsCast + loonstats.SpellsCast + milchstats.SpellsCast;
	response += 'Spells cast: '+sstat+'\n';
	var dstat = babestats.DamageDealt + dhingstats.DamageDealt + edstats.DamageDealt + idastats.DamageDealt + longstats.DamageDealt + loonstats.DamageDealt + milchstats.DamageDealt;
	response += 'Damage dealt: '+dstat+'\n';
	var hstat = babestats.HealingDone + dhingstats.HealingDone + edstats.HealingDone + idastats.HealingDone + longstats.HealingDone + loonstats.HealingDone + milchstats.HealingDone;
	response += 'Healing done: '+hstat+'\n';
	var bstat = babestats.Blocks + dhingstats.Blocks + edstats.Blocks + idastats.Blocks + longstats.Blocks + loonstats.Blocks + milchstats.Blocks;
	response += 'Blocks: '+bstat+'\n';
	var dtstat = babestats.DamageTaken + dhingstats.DamageTaken + edstats.DamageTaken + idastats.DamageTaken + longstats.DamageTaken + loonstats.DamageTaken + milchstats.DamageTaken;
	response += 'Damage Taken: '+dtstat+'\n';
	var ndstat = babestats.NearDeaths + dhingstats.NearDeaths + edstats.NearDeaths + idastats.NearDeaths + longstats.NearDeaths + loonstats.NearDeaths + milchstats.NearDeaths;
	response += 'Near Deaths: '+ndstat+'\n';
	var rstat = babestats.Revives + dhingstats.Revives + edstats.Revives + idastats.Revives + longstats.Revives + loonstats.Revives + milchstats.Revives;
	response += 'Revives: '+rstat+'\n';
	response += 'Warning: All stats are subject to drunken, human error'+'\n';
	message.channel.send(response);
}	

function printFinalBlowsRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.FinalBlows]);
	ary.push([dhingstats.Title, dhingstats.FinalBlows]);
	ary.push([edstats.Title, edstats.FinalBlows]);
	ary.push([idastats.Title, idastats.FinalBlows]);
	ary.push([longstats.Title, longstats.FinalBlows]);
	ary.push([loonstats.Title, loonstats.FinalBlows]);
	ary.push([milchstats.Title, milchstats.FinalBlows]);
	ary.sort(function(a, b){ return b[1] - a[1] });

	response += 'Final Blows Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printCriticalHitsRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.CriticalHits]);
	ary.push([dhingstats.Title, dhingstats.CriticalHits]);
	ary.push([edstats.Title, edstats.CriticalHits]);
	ary.push([idastats.Title, idastats.CriticalHits]);
	ary.push([longstats.Title, longstats.CriticalHits]);
	ary.push([loonstats.Title, loonstats.CriticalHits]);
	ary.push([milchstats.Title, milchstats.CriticalHits]);
	ary.sort(function(a, b){ return b[1] - a[1] });

	response += 'Critical Hits Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printAttacksRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.Attacks]);
	ary.push([dhingstats.Title, dhingstats.Attacks]);
	ary.push([edstats.Title, edstats.Attacks]);
	ary.push([idastats.Title, idastats.Attacks]);
	ary.push([longstats.Title, longstats.Attacks]);
	ary.push([loonstats.Title, loonstats.Attacks]);
	ary.push([milchstats.Title, milchstats.Attacks]);
	ary.sort(function(a, b){ return b[1] - a[1] });

	response += 'Attacks Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printAttacksLandedRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.AttacksLanded]);
	ary.push([dhingstats.Title, dhingstats.AttacksLanded]);
	ary.push([edstats.Title, edstats.AttacksLanded]);
	ary.push([idastats.Title, idastats.AttacksLanded]);
	ary.push([longstats.Title, longstats.AttacksLanded]);
	ary.push([loonstats.Title, loonstats.AttacksLanded]);
	ary.push([milchstats.Title, milchstats.AttacksLanded]);
	ary.sort(function(a, b){ return b[1] - a[1] });

	response += 'Attacks Landed Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printAttackAccuracyRank(message){
	var ary = [];
	var response = '';

	var acc = Math.floor((babestats.AttacksLanded / babestats.Attacks) * 100);
	ary.push([babestats.Title, acc]);
	acc = Math.floor((dhingstats.AttacksLanded / dhingstats.Attacks) * 100);
	ary.push([dhingstats.Title, acc]);
	acc = Math.floor((edstats.AttacksLanded / edstats.Attacks) * 100);
	ary.push([edstats.Title, acc]);
	acc = Math.floor((idastats.AttacksLanded / idastats.Attacks) * 100);
	ary.push([idastats.Title, acc]);
	acc = Math.floor((longstats.AttacksLanded / longstats.Attacks) * 100);
	ary.push([longstats.Title, acc]);
	acc = Math.floor((loonstats.AttacksLanded / loonstats.Attacks) * 100);
	ary.push([loonstats.Title, acc]);
	acc = Math.floor((milchstats.AttacksLanded / milchstats.Attacks) * 100);
	ary.push([milchstats.Title, acc]);
	ary.sort(function(a, b){ return b[1] - a[1] });

	response += 'Attack Accuracy Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'%'+'\n';
	}
	message.channel.send(response);
}

function printSpellsCastRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.SpellsCast]);
	ary.push([dhingstats.Title, dhingstats.SpellsCast]);
	ary.push([edstats.Title, edstats.SpellsCast]);
	ary.push([idastats.Title, idastats.SpellsCast]);
	ary.push([longstats.Title, longstats.SpellsCast]);
	ary.push([loonstats.Title, loonstats.SpellsCast]);
	ary.push([milchstats.Title, milchstats.SpellsCast]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	
	response += 'Spells Cast Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printDamageDealtRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.DamageDealt]);
	ary.push([dhingstats.Title, dhingstats.DamageDealt]);
	ary.push([edstats.Title, edstats.DamageDealt]);
	ary.push([idastats.Title, idastats.DamageDealt]);
	ary.push([longstats.Title, longstats.DamageDealt]);
	ary.push([loonstats.Title, loonstats.DamageDealt]);
	ary.push([milchstats.Title, milchstats.DamageDealt]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	
	response += 'Damage Dealt Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printSingleRoundDamageRank(message){
	var ary = [];
	var response = '';
	ary.push([babestats.Title, babestats.PeakDamage]);
	ary.push([dhingstats.Title, dhingstats.PeakDamage]);
	ary.push([edstats.Title, edstats.PeakDamage]);
	ary.push([idastats.Title, idastats.PeakDamage]);
	ary.push([longstats.Title, longstats.PeakDamage]);
	ary.push([loonstats.Title, loonstats.PeakDamage]);
	ary.push([milchstats.Title, milchstats.PeakDamage]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	
	response += 'Single Round Damage Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printHealingRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.HealingDone]);
	ary.push([dhingstats.Title, dhingstats.HealingDone]);
	ary.push([edstats.Title, edstats.HealingDone]);
	ary.push([idastats.Title, idastats.HealingDone]);
	ary.push([longstats.Title, longstats.HealingDone]);
	ary.push([loonstats.Title, loonstats.HealingDone]);
	ary.push([milchstats.Title, milchstats.HealingDone]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	
	response += 'Healing Done Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printBlocksRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.Blocks]);
	ary.push([dhingstats.Title, dhingstats.Blocks]);
	ary.push([edstats.Title, edstats.Blocks]);
	ary.push([idastats.Title, idastats.Blocks]);
	ary.push([longstats.Title, longstats.Blocks]);
	ary.push([loonstats.Title, loonstats.Blocks]);
	ary.push([milchstats.Title, milchstats.Blocks]);
	ary.sort(function(a, b){ return b[1] - a[1] });
	
	response += 'Blocks Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printDamageTakenRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.DamageTaken]);
	ary.push([dhingstats.Title, dhingstats.DamageTaken]);
	ary.push([edstats.Title, edstats.DamageTaken]);
	ary.push([idastats.Title, idastats.DamageTaken]);
	ary.push([longstats.Title, longstats.DamageTaken]);
	ary.push([loonstats.Title, loonstats.DamageTaken]);
	ary.push([milchstats.Title, milchstats.DamageTaken]);
	ary.sort(function(a, b){ return a[1] - b[1] });
	
	response += 'Damage Taken Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printNearDeathsRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.NearDeaths]);
	ary.push([dhingstats.Title, dhingstats.NearDeaths]);
	ary.push([edstats.Title, edstats.NearDeaths]);
	ary.push([idastats.Title, idastats.NearDeaths]);
	ary.push([longstats.Title, longstats.NearDeaths]);
	ary.push([loonstats.Title, loonstats.NearDeaths]);
	ary.push([milchstats.Title, milchstats.NearDeaths]);
	ary.sort(function(a, b){ return a[1] - b[1] });
	
	response += 'Near Deaths Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printRevivesRank(message){
	var ary = [];
	var response = '';

	ary.push([babestats.Title, babestats.Revives]);
	ary.push([dhingstats.Title, dhingstats.Revives])
	ary.push([edstats.Title, edstats.Revives]);
	ary.push([idastats.Title, idastats.Revives]);
	ary.push([longstats.Title, longstats.Revives]);
	ary.push([loonstats.Title, loonstats.Revives]);
	ary.push([milchstats.Title, milchstats.Revives]);
	ary.sort(function(a, b){ return b[1] - a[1] });

	response += 'Revives Leaderboard\n';
	for(var i=0;i<ary.length;i++){
		response += ary[i][0]+':   '+ary[i][1]+'\n';
	}
	message.channel.send(response);
}

function printHelp(message){
	var response = 'Rime of the Frostmaiden Stat Bot Help\n';
	response += '<----------------------------------->\n';
	response += 'Stats\n';
	response += '- !s followed by command\n';
	response += '- command can be a party members name to print their stats\n';
	response += '- command can be \'party\' to print the party\'s combined stats\n';
	response += '<----------------------------------->\n';
	response += 'Rank\n';
	response += '- !r follow by one of the following commands\n';
	response += '- final blows\n';
	response += '- critical hits\n';
	response += '- attacks\n';
	response += '- attacks landed\n';
	response += '- attack accuracy\n';
	response += '- spells cast\n';
	response += '- damage dealt\n';
	response += '- single round damage\n';
	response += '- healing\n';
	response += '- blocks\n';
	response += '- damage taken\n';
	response += '- near deaths\n';
	response += '- revives\n';
	response += '<----------------------------------->\n';
	response += 'Help\n';
	response += '- !h\n';
	response += '- lists available commands\n';
	response += '<----------------------------------->\n';
	response += 'Remember to stay warm out there!\n';
	message.channel.send(response);
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
		}else if(command === 'longinus' || command === 'longinushest'){
			printPlayerStats(message, longstats);
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
