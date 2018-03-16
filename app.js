var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let port = process.env.PORT || 3000;
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





bot.login('NDI0MjU3MzM4MTY2MzQ1NzI5.DY2Z_w.P35qL3340GKUdGlHboJT7cW7xDM');

const prefix = "!!";

    bot.on('ready', () => {
        console.log('bot has launched..');
        bot.user.setStatus('online');
        bot.user.setActivity('in your mom\'s vagina');
    });

    bot.on("presenceUpdate", (oldMember, newMember)=>{
      let username      = newMember.user.username;
      let status        = newMember.user.presence.status;
      let oldStatus        = oldMember.user.presence.status;
      let guildChannels = newMember.guild.channels;
      console.log(status)
      if(status == "online"){
          guildChannels.find('name','NipponChan').send(`${newMember.user.username} is now ${newMember.user.presence.status}`,{tts:true}).catch((err)=>send(err));
          console.log(`${newMember.user.username} is now ${newMember.user.presence.status}`);
      }else{
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
      message.channel.send('magnus and luca is retarded', {tts:true});
    }else if (message.content.startsWith(prefix + "delete channel")){

      let deleting = new Discord.RichEmbed()
      .setDescription("everything is being deleted...")
      .setColor("#41caf4")
      .addField('.............................................',`faggot`);

      message.channel.send(deleting);
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


app.listen(port, ()=>{
  console.log(`server is up on ${port}`);
})
module.exports = app;
