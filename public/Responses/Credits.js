const {Discord} = require('../Modules/ExternalModules')

function Credits (channel) {
    let botembed = new Discord.RichEmbed()
    .setDescription("Creator info")
    .setColor("#41caf4")
    .addField('.............................................', `I was made by the greatest man alive, ANUBIS`);
    
    channel.send(botembed);    
}

module.exports = Credits
