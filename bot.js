var tr_loop = true

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const {
    Discord,
    config,
    google
  } = require('./init.js')

  // Get langs data
  try {
    methods = require('./langs/methods-en.json')
  } catch (e) {
    console.log('Please create a ./langs/methods-en.json file.\n' + e.stack)
    process.exit()
  }

  try {
    text = require('./langs/en.json')
  } catch (e) {
    console.log('Please create a ./langs/en.json file.\n' + e.stack)
    process.exit()
  }

  const commands_availables = config.commands_availables

  console.log('--------------------------------')
  console.log('Starting Oniro Bot\nNode version: ' + process.version + '\nDiscord.js version: ' + Discord.version)
  console.log('--------------------------------')

  // Create an instance of a Discord client
  const client = new Discord.Client({
    autoReconnect: true
  })

  client.on('ready', () => {
    console.log('--------------------------------')
    client.user.setPresence({
      game: {
        name: config.in_game,
        type: config.in_game_type
      }
    })
    client.user.setStatus(config.status)
  })

  client.on('message', async message => {

    if (!message.content.startsWith(config.prefix) || message.author.bot) return

    var message_received_array = message.content.split('!').map(v => v.toLowerCase())
    var message_received_array = message_received_array[1].split(' ')
    var command = message_received_array[0]
    var option = message_received_array[1]

    for (i = 0; i < commands_availables.length; i++) {

      if (commands_availables[i] === command) {

        // HELP
        if (command === 'help') {
          message.channel.send({
            embed: {
              color: 3447003,
              fields: [{
                name: text.command.help.name,
                value: text.command.help.value
              }]

            }
          })

        }

        // Lang
        if (command === 'lang') {

          if (option === 'fr' || option === 'french') {
            try {
              methods = require('./langs/methods-fr.json')
            } catch (e) {
              console.log('File ./langs/methods-fr.json not found.\n' + e.stack)
            }

            try {
              text = require('./langs/fr.json')
            } catch (e) {
              console.log('File ./langs/fr.json not found.\n' + e.stack)
            }

            message.channel.send('La langue a été changé')
          }

          else if (option === 'en' || option === 'english') {
            try {
              methods = require('./langs/methods-en.json')
            } catch (e) {
              console.log('File ./langs/methods-en.json not found.\n' + e.stack)
            }

            try {
              text = require('./langs/en.json')
            } catch (e) {
              console.log('File ./langs/en.json not found.\n' + e.stack)
            }

            message.channel.send('The language has been successfully changed')
          }

          else {
            message.channel.send(text.error.lang_not_found)
          }

        }

        // BEST DREAMER
        if (command === 'suis-je-le-meilleur-reveur') {
          if (getRandomIntInclusive(0, 10) > 8) {
            message.channel.send('oui')
          } else {
            message.channel.send('NOP')
          }
        }

        // Google search
        if (command === 'search') {

          google.lang = text.accro

          if (text.accro === 'fr') {
            var query = 'rêves lucides ' + option
          } else if (text.accro === 'en') {
            var query = 'lucid dreams ' + option
          } else {
            var query = 'lucid dreams ' + option
          }

          google(query, function (err, res){
            if (err) console.error(err)
            var link = res.links[0];
            message.channel.send('[Google] ' + link.title + ' - ' + link.href)
          })

        }

        // TR
        /*if (command === 'tr') {
          if (option === 'true') {
            setInterval(function() {
              if (tr_loop === true) {
                message.channel.send('On oublie pas le TR !')
              }
            }, 216000)
          } else if (option === 'false') {
            tr_loop = false
            message.channel.send("Le rappel de TR a été désactivé")
          }
        }*/

        // METHODS
        if (command === 'method') {

          if (option === 'wbtb') {
            message.channel.send({
              embed: {
                color: 3447003,
                fields: [{
                  name: methods.wbtb.title,
                  value: methods.wbtb.desc
                }]

              }
            })
          } else if (option === 'mild') {
            message.channel.send({
              embed: {
                color: 3447003,
                fields: [{
                  name: methods.mild.title,
                  value: methods.mild.desc
                }]

              }
            })
          } else if (option === 'wild') {
            message.channel.send({
              embed: {
                color: 3447003,
                fields: [{
                  name: methods.wild.title,
                  value: methods.wild.desc
                }]

              }
            })
          } else if (option === 'muo') {
            message.channel.send({
              embed: {
                color: 3447003,
                fields: [{
                  name: methods.muo.title,
                  value: methods.muo.desc
                }]

              }
            })
          } else {
            message.channel.send(text.error.method_not_found)
          }

        }

      }
    }

  })

  // Capture bugs
  client.on('error', (e) => console.error(e));
  client.on('warn', (e) => console.warn(e));
  client.on('debug', (e) => console.info(e))

  // Log our bot in
  client.login(config.token)