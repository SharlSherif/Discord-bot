const prefix = "!!";

const commands = {
    creator: createCommand('creator'),
    date:  createCommand('date'),
    joke: createCommand('joke'),
    hentai: createCommand('h'),
    google: createCommand('g'),
}

function createCommand(cmd) {
    return `${prefix}${cmd}`
}

module.exports = commands