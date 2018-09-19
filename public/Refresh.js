const https = require('https')

function Refresh (duration) {
    duration = duration / 60

    setInterval(() => {
        https.get("https://discord-botx1.herokuapp.com/");
    }, duration); // every 25 minutes it sends a GET request to keep the hosting awake
}
// 1500000

module.exports = Refresh