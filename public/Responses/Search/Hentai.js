const {
    request,
    Discord
} = require('../../Modules/ExternalModules')

const commands = require('../../Commands')

function GetHentai(channel, messageContent) {
    const User_tags = encodeURI(messageContent.replace(`${commands.hentai}`, "")); // user specified tag. if none is written it runs by default

    request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=1&json=1&tags=${User_tags}&cid=1`, (err, result) => {
        if (!err && result.body) {
            let body = JSON.parse(result.body)[0],
                hentai_image = body.file_url;
            debugger
            let gelbooru_image_embed = new Discord.RichEmbed()
                .setAuthor(body.owner, hentai_image) // the author name
                .setImage(hentai_image) // the image
                .setFooter(body.tags.substring(1, 50)) // image tags
                .setColor('#ac41f4') // left side color

            channel.send(gelbooru_image_embed); // send the embed          
        } else {
            channel.send('`NOT FOUND. try with different tags.`');
        }
    }) // search on gelbooru.com
}

module.exports = GetHentai