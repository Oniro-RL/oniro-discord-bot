try {
	exports.Discord = require('discord.js')
} catch (e) {
	console.log(e.stack)
	console.log(process.version)
	console.log('Please run npm install and ensure it passes with no errors!')
	process.exit()
}

// Get configuration data
try {
	exports.config = require('./config.json')
} catch (e) {
	console.log('Please create a config.json file.\n' + e.stack)
	process.exit()
}

// Get configuration data
try {
	exports.google = require('google')
} catch (e) {
	console.log('Please run npm install and ensure it passes with no errors!')
	process.exit()
}



