const {
    request,
    Discord
} = require('../Modules/ExternalModules')

function GetJoke(channel) {
    request("http://api.yomomma.info/", (err, result) => { // jokes api (101 joke)
        if (err) channel.send('Unexpected Error')

        let joke = JSON.parse(result.body).joke
        let botembed = new Discord.RichEmbed()
            .setDescription("Sick Joke")
            .setColor("#4245f4")
            .addField(`${joke}`, 'I wanna fucking die');

        channel.send(botembed);
    })
}

module.exports = GetJoke