// ? External Modules
const {
    bot,
    GoogleSearch
} = require('./Modules/ExternalModules')

const ProductionVars = require('./ProductionVars')

// ? Google Search API
const googleSearch = new GoogleSearch({
    key: ProductionVars.google.key,
    cx:  ProductionVars.google.cx
});


// ? Logging into the bot
bot.login(ProductionVars.BOT_TOKEN);

module.exports = {
    googleSearch
}