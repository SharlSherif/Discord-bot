var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const EventEmitter = require('events');
const Discord = require("discord.js");
const bot = new Discord.Client();

// var userStatus = require('./public/javascripts/client-status');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);





bot.login('NDIzOTc4MjIyNzM3NDI0Mzg0.DYyMXQ.xB33Z32bJgnu4XkknXWMvA1cC60');

const prefix = "!!";

bot.on('ready', () => {
    console.log('bot has launched..');
    bot.user.setStatus('idle');
    bot.user.setActivity('in your mom\'s vagina');
});

    bot.on("presenceUpdate", (oldMember, newMember)=>{
      let username = newMember.user.username;
      let status = newMember.user.presence.status;
      let guildChannels = newMember.guild.channels;

      // if(newMember.user.presence.status == "offline" & oldMember.user.presence.status == "online"){
      //   guildChannels.find('name','nipponchan').send(`${newMember.user.username} is now ${newMember.user.presence.status}`,{tts:true}).catch((err)=>send(err));
      if (newMember.user.presence.status == "online" & oldMember.user.presence.status == "offline"){
        guildChannels.find('name','nipponchan').send(`${newMember.user.username} is now ${newMember.user.presence.status}`,{tts:true}).catch((err)=>send(err));
      }else {
        return null;
      }
    })

  bot.on('message', (message) => {

    if (message.content.startsWith(prefix + "creator")) {

      let botembed = new Discord.RichEmbed()
      .setDescription("Creator info")
      .setColor("#41caf4")
      .addField('.............................................',`I was made by the greatest man alive, ANUBIS`);

      message.channel.send(botembed);
    }else if (message.content.startsWith(prefix + "secret")){
      message.channel.send('magnus , luca is retarded', {tts:true});
    }
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


app.listen(3000, ()=>{
  console.log('server is up on 3000');
})
module.exports = app;
