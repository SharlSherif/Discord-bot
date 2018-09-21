const {
    Discord,
    moment
} = require('../Modules/ExternalModules')

const commands = require('../Commands')

async function Timer(channel, messageContent, voiceChannel) {
    let Timer = messageContent.replace(`${commands.Timer}`, ""); // user specified tag. if none is written it runs by default
    let Counter = 0
    let TimeLeft;
    let Substraction; // ? subsctraction between the Timer set and the Counter

    if (Timer > 0) await channel.send(`Timer Set To ${Timer} Minutes`) 
    else return channel.send(`Insert time in minutes`)

    Timer = Timer * 60 // ? converts seconds to to minutes

    let IncreasingCounter = setInterval(async () => {
        if (Counter < Timer) { // ? if the Counter is still
            Counter++ // ? increase the time by ONE each SECOND
            Substraction = Timer - Counter

            TimeLeft = (Substraction) < 60 ? `${Substraction} Second (s)` : `${(Substraction)/60} Minute (s)`

            if (Counter == Timer / 2 || Counter == Timer / 4 || Counter == Timer / 8 ) channel.send(`${TimeLeft} Left`, {tts: true})

            if (Counter == Timer) { // ? if the Timer is done
                if (voiceChannel) { // ? if there's anyone in voice channel
                    await voiceChannel.join().then(connection => {  // ? join that channel
                        const alarmSiren = connection.playFile('./public/audio/siren.mp3'); // ? Play an MP3 file

                        // ! after the mp3 file ends. LEAVE THE CHANNEL.
                        alarmSiren.on("end", () => voiceChannel.leave())
                    }).catch(err => channel.send(`${err}`))
                }

                channel.send('`ALARM ALARM ALARM, TIME IS OVER`', {tts: true})
            }
        } else {
            clearInterval(IncreasingCounter)
        }
    }, 1000)
}

module.exports = Timer