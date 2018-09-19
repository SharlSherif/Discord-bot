const {
    moment
} = require('../Modules/ExternalModules')

function joinDate(channel, joinDate, username) {
    channel.send(`${username} joined at ${moment(joinDate).format("MMM Do YYYY")}`); // ANUBIS joined at Mar 30th 2018
}

module.exports = joinDate