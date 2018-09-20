const {
    Discord,
    moment
} = require('../Modules/ExternalModules')

const commands = require('../Commands')

async function Timer(channel, messageContent, voiceChannel) {
    let i = 0
    let timer = messageContent.replace(`${commands.timer}`, ""); // user specified tag. if none is written it runs by default

    await channel.send(`Timer Set To ${timer} Minutes`)

    // timer = timer * 1000
    debugger
    setInterval(() => {
        i++
        if (i == timer / 2 || i == timer / 4) channel.send(`${timer-i} Minutes left`, {
            tts: true
        })
        if (i == timer) {
            voiceChannel.join().then(connection => {
                const alarmSiren = connection.playFile('./The-purge-siren.mp3');

                alarmSiren.on("end", () => {
                    voiceChannel.leave()
                })
            }).catch(err => console.log(err));

            channel.send(`ALAAAAAAARM ALAAAAAAARM, TIMER IS DONE, i wanna fucking dieeeee`, {
                tts: true
            })
        }
    }, 1000)
}

module.exports = Timer