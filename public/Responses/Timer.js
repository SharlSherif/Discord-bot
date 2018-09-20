const {
    Discord,
    moment
} = require('../Modules/ExternalModules')

function Timer(channel, timer) {
    channel.send(`Timer Set To ${timer}`).then((msg) => {
        for (let i = 0; i <= timer; i++) {
            msg.edit(i)
        }
    })
}

module.exports = Timer