const prefix = "!!";

const commands = {
    creator: createCommand('creator'),
    date:  createCommand('date'),
    joke: createCommand('joke'),
    hentai: createCommand('h'),
    google: createCommand('g'),
    timer: createCommand('t'),
}

function createCommand(cmd) {
    return `${prefix}${cmd}`
}

module.exports = commands