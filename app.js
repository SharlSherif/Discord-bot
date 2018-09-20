const productionVars = require('./public/ProductionVars')
const PORT = productionVars.PORT
// ? Start Modules
const {
  app
} = require('./public/Modules/InternalModules')

const {
  bot
} = require('./public/Modules/ExternalModules')
// ? End Modules

// ? Start Credentials
const {
  googleSearch
} = require('./public/Credentials');
// ?  End Credentials

// ?  Start Commands
const commands = require('./public/Commands')
// ?  End Commands

// ? Start Responses
const Credits = require('./public/Responses/Credits')
const joinDate = require('./public/Responses/joinDate')
const GetJoke = require('./public/Responses/Jokes')
const GetHentai = require('./public/Responses/Search/Hentai')
const Google = require('./public/Responses/Search/GoogleImages')
const Timer = require('./public/Responses/Timer')
// ? End Responses

// const Refresh = require('./public/Refresh')

// // ? Make sure the host isn't sleeping
// Refresh(25) // make a get request to the host every 25 MINUTES

bot.on('ready', () => {
  console.log('bot has launched..');
  bot.user.setStatus('online');
  bot.user.setActivity('in your mom\'s vagina');
});


bot.on('message', (message) => {
  const joindate = message.member.guild.joinedTimestamp;
  const username = message.member.user.username;
  const channel = message.channel
  const messageContent = message.content

  if (messageContent.startsWith(commands.creator)) Credits(channel)

  else if (messageContent.startsWith(commands.date)) joinDate(channel, joindate, username)

  else if (messageContent.startsWith(commands.joke)) GetJoke(channel)

  else if (messageContent.startsWith(commands.hentai)) GetHentai(channel, messageContent)

  else if (messageContent.startsWith(commands.google)) Google(channel, messageContent)
  
  else if (messageContent.startsWith(commands.timer)) Timer(channel, 20)
});


bot.on('disconnect', function (msg, code) {
  if (code === 0) return console.error(msg);
  // bot.connect();
});

app.listen(PORT, () => {
  console.log(`server is up on ${PORT}`);
});

module.exports = app;