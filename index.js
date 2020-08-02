const Discord = require('discord.js');
const Canvas = require('canvas');
const schedule = require('node-schedule');
const { prefix, token } =  require('./config.json');
const client = new Discord.Client();
const fs = require('fs');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const serverID = '476976554254139392';
const channelID = '724753195431362682';

let letters = [];
letters[32] =  [[0,0,0], //Space
				[0,0,0],
				[0,0,0],
				[0,0,0],
				[0,0,0],
				[0,0,0],
				[0,0,0]];
letters[33] =  [[1], //!
				[1],
				[1],
				[1],
				[1],
				[0],
				[1]];
letters[46] =  [[0], //Period
				[0],
				[0],
				[0],
				[0],
				[0],
				[1]];
letters[48] =  [[0,1,1,0], //0
				[1,0,0,1],
				[1,0,1,1],
				[1,1,0,1],
				[1,0,0,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[49] =  [[0,1], //1
				[1,1],
				[0,1],
				[0,1],
				[0,1],
				[0,1],
				[0,1]];
letters[50] =  [[0,1,1,0], //2
				[1,0,0,1],
				[0,0,0,1],
				[0,0,0,1],
				[0,0,1,0],
				[0,1,0,0],
				[1,1,1,1]];
letters[51] =  [[0,1,1,0], //3
				[1,0,0,1],
				[0,0,0,1],
				[0,0,1,0],
				[0,0,0,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[52] =  [[0,0,1,0], //4
				[0,1,1,0],
				[1,0,1,0],
				[1,1,1,1],
				[0,0,1,0],
				[0,0,1,0],
				[0,0,1,0]];
letters[53] =  [[1,1,1,1], //5
				[1,0,0,0],
				[1,0,0,0],
				[1,1,1,0],
				[0,0,0,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[54] =  [[0,1,1,0], //6
				[1,0,0,1],
				[1,0,0,0],
				[1,1,1,0],
				[1,0,0,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[55] =  [[1,1,1,1], //7
				[0,0,0,1],
				[0,0,0,1],
				[0,0,1,0],
				[0,1,0,0],
				[0,1,0,0],
				[0,1,0,0]];
letters[56] =  [[0,1,1,0], //8
				[1,0,0,1],
				[1,0,0,1],
				[0,1,1,0],
				[1,0,0,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[57] =  [[0,1,1,0], //9
				[1,0,0,1],
				[1,0,0,1],
				[0,1,1,1],
				[0,0,0,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[63] =  [[0,1,1,0], //?
				[1,0,0,1],
				[0,0,0,1],
				[0,0,1,0],
				[0,1,0,0],
				[0,0,0,0],
				[0,1,0,0]];
letters[65] =  [[0,1,0], //A
				[1,0,1],
				[1,0,1],
				[1,1,1],
				[1,0,1],
				[1,0,1],
				[1,0,1]];
letters[66] =  [[1,1,0], //B
				[1,0,1],
				[1,0,1],
				[1,1,0],
				[1,0,1],
				[1,0,1],
				[1,1,0]];
letters[67] =  [[0,1,1,0], //C
				[1,0,0,1],
				[1,0,0,0],
				[1,0,0,0],
				[1,0,0,0],
				[1,0,0,1],
				[0,1,1,0]];
letters[68] =  [[1,1,0], //D
				[1,0,1],
				[1,0,1],
				[1,0,1],
				[1,0,1],
				[1,0,1],
				[1,1,0]];
letters[69] =  [[1,1,1], //E
				[1,0,0],
				[1,0,0],
				[1,1,0],
				[1,0,0],
				[1,0,0],
				[1,1,1]];
letters[70] =  [[1,1,1], //F
				[1,0,0],
				[1,0,0],
				[1,1,0],
				[1,0,0],
				[1,0,0],
				[1,0,0]];
letters[71] =  [[0,1,1,0], //G
				[1,0,0,1],
				[1,0,0,0],
				[1,0,0,0],
				[1,0,1,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[72] =  [[1,0,1], //H
				[1,0,1],
				[1,0,1],
				[1,1,1],
				[1,0,1],
				[1,0,1],
				[1,0,1]];
letters[73] =  [[1], //I
				[1],
				[1],
				[1],
				[1],
				[1],
				[1]];
letters[74] =  [[0,0,0,1], //J
				[0,0,0,1],
				[0,0,0,1],
				[0,0,0,1],
				[0,0,0,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[75] =  [[1,0,0,1], //K
				[1,0,0,1],
				[1,0,1,0],
				[1,1,0,0],
				[1,0,1,0],
				[1,0,0,1],
				[1,0,0,1]];
letters[76] =  [[1,0,0], //L
				[1,0,0],
				[1,0,0],
				[1,0,0],
				[1,0,0],
				[1,0,0],
				[1,1,1]];
letters[77] =  [[1,0,0,0,1], //M
				[1,1,0,1,1],
				[1,0,1,0,1],
				[1,0,0,0,1],
				[1,0,0,0,1],
				[1,0,0,0,1],
				[1,0,0,0,1]];
letters[78] =  [[1,0,0,0,1], //N
				[1,1,0,0,1],
				[1,0,1,0,1],
				[1,0,1,0,1],
				[1,0,1,0,1],
				[1,0,0,1,1],
				[1,0,0,0,1]];
letters[79] =  [[0,1,1,0], //O
				[1,0,0,1],
				[1,0,0,1],
				[1,0,0,1],
				[1,0,0,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[80] =  [[1,1,0], //P
				[1,0,1],
				[1,0,1],
				[1,1,0],
				[1,0,0],
				[1,0,0],
				[1,0,0]];
letters[81] =  [[0,1,1,0,0], //Q
				[1,0,0,1,0],
				[1,0,0,1,0],
				[1,0,0,1,0],
				[1,0,0,1,0],
				[1,0,1,1,0],
				[0,1,1,1,1]];
letters[82] =  [[1,1,0], //R
				[1,0,1],
				[1,0,1],
				[1,1,0],
				[1,0,1],
				[1,0,1],
				[1,0,1]];
letters[83] =  [[0,1,1,0], //S
				[1,0,0,1],
				[1,0,0,0],
				[0,1,1,0],
				[0,0,0,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[84] =  [[1,1,1], //T
				[0,1,0],
				[0,1,0],
				[0,1,0],
				[0,1,0],
				[0,1,0],
				[0,1,0]];
letters[85] =  [[1,0,0,1], //U
				[1,0,0,1],
				[1,0,0,1],
				[1,0,0,1],
				[1,0,0,1],
				[1,0,0,1],
				[0,1,1,0]];
letters[86] =  [[1,0,0,0,1], //V
				[1,0,0,0,1],
				[0,1,0,1,0],
				[0,1,0,1,0],
				[0,1,0,1,0],
				[0,1,0,1,0],
				[0,0,1,0,0]];
letters[87] =  [[1,0,0,0,1], //W
				[1,0,0,0,1],
				[1,0,0,0,1],
				[1,0,1,0,1],
				[1,0,1,0,1],
				[1,0,1,0,1],
				[0,1,0,1,0]];
letters[88] =  [[1,0,0,0,1], //X
				[1,0,0,0,1],
				[0,1,0,1,0],
				[0,0,1,0,0],
				[0,1,0,1,0],
				[1,0,0,0,1],
				[1,0,0,0,1]];
letters[89] =  [[1,0,0,0,1], //Y
				[1,0,0,0,1],
				[0,1,0,1,0],
				[0,0,1,0,0],
				[0,0,1,0,0],
				[0,0,1,0,0],
				[0,0,1,0,0]];
letters[90] =  [[1,1,1,1], //Z
				[0,0,0,1],
				[0,0,1,0],
				[0,0,1,0],
				[0,1,0,0],
				[1,0,0,0],
				[1,1,1,1]];
letters[95] =  [[0,0,0], //_
				[0,0,0],
				[0,0,0],
				[0,0,0],
				[0,0,0],
				[0,0,0],
				[1,1,1]];
client.once('ready', async () => {
	console.log('Ready!');
});

client.on('message', async message => {
	if (message.channel.id == channelID)
	{
		await speakToBot(message);
	}
});

async function speakToBot(message)
{
	if (message.author.id == client.user.id)
	{
		return;
	}
	let channel = message.channel;
	let text = message.content;
	if (text.length > 40) {
		channel.send('The generator does not permit text strings over 40 characters. Sorry!')
	}
	else if (text.length > 0) {	
		//console.log(text);	
		await renderGrid(channel, text);
	}	
}
async function calculateLogoWidth(filteredText)
{
	let totalLogoWidth = 0;
	for (let i = 0; i < filteredText.length; i++) { //Iterate through each character.
		let unicodeVal = filteredText.charCodeAt(i);
		let characterData = letters[unicodeVal];
		if (characterData == null) {
			characterData = letters[32]; //Space functions as an error handler.
		}
		let characterWidth = characterData[0].length;
		totalLogoWidth = totalLogoWidth + characterWidth + 1; //The 1 accomodates spacing between each character
	}
	totalLogoWidth--; //Removes spacing from final character.
	return totalLogoWidth;
}
async function renderGrid(channel, text)
{	
	if (!channel) return;
	// Set a new canvas to the dimensions of ??x?? pixels
	let messageText = "";
	
	let filteredText = text.toUpperCase(); //Modify text to make all lowercase letters uppercase.
	//console.log(filteredText);
	let totalLogoWidth = await calculateLogoWidth(filteredText);
	//console.log(totalLogoWidth);
	
	let totalDeadSpace = 6; //Math.floor(totalLogoWidth/3); //This determines how much negative space exists.
	let width = totalLogoWidth + totalDeadSpace;
	if (width < 9) {
		width = 9;
		totalDeadSpace = width - totalLogoWidth;
	}
	
	let height = width; //7;

	let resThreshold = 128*3;
	//console.log(width);
	//The program will determine an upscale amount that makes the final picture above the resolution threshold while still being as low as possible.
	let upscaleMult = Math.ceil(resThreshold / width);
	//console.log(upscaleMult);
	if (upscaleMult % 2 != 0) { //This variable must be a multiple of 2 for proper functionality.
		upscaleMult++;
	}
	if (upscaleMult > 36) {
		upscaleMult = 36; //For some reason, it doesn't like scaling higher than 36.
	}
	//upscaleMult = 36;
	const canvas = Canvas.createCanvas(width*upscaleMult, height*upscaleMult);
	// ctx (context) will be used to modify a lot of the canvas
	const ctx = canvas.getContext('2d');
	ctx.scale(upscaleMult, upscaleMult);
	const background = await Canvas.loadImage('./Sprites/trans.png');
	ctx.fillStyle = "#FFFFFF";
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	
	//Both of these startPixel values should be ints every time so rounding correcting shouldn't be necessary.
	let startPixelX = totalDeadSpace/2;
	let startPixelY = height/2 - 3.5;

	let containsUnsupportedCharacters = false;
	for (let i = 0; i < filteredText.length; i++) { //Iterate through each character.

		let unicodeVal = filteredText.charCodeAt(i);
		let characterData = letters[unicodeVal];
		if (characterData == null) {
			characterData = letters[32]; //Space functions as an error handler.
			containsUnsupportedCharacters = true;
		}
		let width = characterData[0].length;
		let height = characterData.length; //This should always be 7.
		for (c = 0; c < width; c++) {
			for (r = 0; r < characterData.length; r++) {
				if (characterData[r][c] == 1) {
					ctx.fillRect(startPixelX + c, startPixelY + r, 1, 1);
				}
			}
		}
		startPixelX = startPixelX + width + 1;
	}

	if (containsUnsupportedCharacters == true) {
		messageText = "Note: The generator detected unsupported characters. These have been represented as an empty space."
	}

	
	//Final render
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Generated by BADGRAPHIX Creations.png');
	await channel.send(messageText, attachment); //You save it as file.png. Can we change the file name?
}
client.login(token);
