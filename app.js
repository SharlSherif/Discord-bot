var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let port = process.env.PORT || 3000;

const unirest = require('unirest');
const moment = require('moment');
const EventEmitter = require('events');
const Discord = require("discord.js");
const bot = new Discord.Client();

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);



const http = require("http");

  setInterval(function() {
      http.get("https://discord-bot2018.herokuapp.com/");
  }, 1500000); // every 25 minutes it sends a GET request to keep the hosting awake


bot.login(process.env.BOT_TOKEN);

const prefix = "!!";

    bot.on('ready', () => {
        console.log('bot has launched..');
        bot.user.setStatus('online');
        bot.user.setActivity('in your mom\'s vagina');
    });

    // bot.on("presenceUpdate", (oldMember, newMember)=> {
    //   let username      = newMember.user.username;
    //   let usertag       = newMember.user.tag;
    //   let newStatus     = newMember.user.presence.status;
    //   let oldStatus     = oldMember.user.presence.status;
    //   let guildChannels = bot.channels;
    //   let guildID       = newMember.guild.id;
    //   let notaBOT       = newMember.user.bot;

    //   console.log('old status',newMember.user.presence.status)

    //     if(notaBOT === false && newStatus === "online" && oldStatus === "offline"){ // to exclude bots, and take action only if user status is {Online}
    //         guildChannels.find("name","general").send(`${username} is now ${newStatus}`, {tts:true});
    //     }
    // });


  bot.on('message', (message) => {
    const joinDate = message.member.guild.joinedTimestamp;
    const username = message.member.user.username;

    if (message.content.startsWith(`${prefix}creator`)) {

      let botembed = new Discord.RichEmbed()
      .setDescription("Creator info")
      .setColor("#41caf4")
      .addField('.............................................',`I was made by the greatest man alive, ANUBIS`);

      message.channel.send(botembed);

    }else if (message.content.startsWith(`${prefix}date`)){

      message.channel.send(`${username} joined at ${moment(joinDate).format("MMM Do YYYY")}`); // ANUBIS joined at Mar 30th 2018
      
    }else if(message.content.startsWith(`${prefix}joke`)){

      unirest.get("http://api.yomomma.info/") // jokes api (101 joke)
      .end(function (result) {
        let joke = result.body.replace(/[{}"":]/g,""); // remove {}"": to get only the joke itself.
        let Filtered_Joke = joke.replace('joke',""); // remove the "joke" word.
        let botembed = new Discord.RichEmbed()
        .setDescription("Sick Joke")
        .setColor("#4245f4")
        .addField(`${Filtered_Joke}`,'so funny lmao!');
  
        message.channel.send(botembed);
      });
    }else if (message.content.startsWith(`${prefix}apb`)){
      message.channel.send(`APB APB APB APB APB APB`, {tts:true});

    }else if (message.content.startsWith(`${prefix}hentai`)){
      let User_tags = encodeURI(message.content.replace("!!hentai","")); // user specified tag. if none is written it runs by default
      
      unirest.get(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=1&json=1&tags=${User_tags}&cid=1`) // search on gelbooru.com
      .end((result) => {
        console.log(result.status);
        if(result.body){
          console.log(result);
          const hentai_image = result.body[0].file_url;
          message.channel.send('cum cum', {file:`${hentai_image}`});
        }
        else {
          message.channel.send(`NOT FOUND. try with different tags.`);
        }
      })
    }else if(message.content.includes('anusbees')){
      message.channel.send(`You mean god of earth? `, {tts:true});
    }
  });


  bot.on('disconnect', function(msg, code) {
      if (code === 0) return console.error(msg);
      bot.connect();
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, ()=>{
  console.log(`server is up on ${port}`);
});

module.exports = app;
