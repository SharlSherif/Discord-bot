const Discord =  require("discord.js"),
      bot =  new Discord.Client()

module.exports = {
    Discord,
    bot,
    request: require('request'),
    moment: require('moment'),
    GoogleSearch: require('google-search')
}