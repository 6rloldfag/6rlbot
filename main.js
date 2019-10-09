var express = require('express');
var app = express();
const mineflayer = require('mineflayer');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var randomNumber = require("random-number-csprng");
var bot = mineflayer.createBot({
    host: "oldfag.org", // optional
    port: 25565, // optional
    username: "", // email and password are required only for
    password: "", // online-mode=true servers
    version: "1.12.2" // false corresponds to auto version detection (that's the default), put for example "1.8.8" if you need a specific version
});
users = [];
connections = []
server.listen(process.env.PORT || 3000)
app.get('/uid', function(req, res) {

res.sendFile(__dirname + '/index.html');
});
io.sockets.on('connection', function(socket) {

  connections.push(socket)
  console.log('connection made: %s sockets connected', connections.length)
  //disconnect
  socket.on('disconnect', function(data){



  connections.splice(connections.indexOf(socket), 1);
  console.log('disconncted made: %s sockets connected', connections.length)
  })
  socket.on('send message', function(data){
    bot.chat(data)

  })

})
bot.on('login', function() {

})
bot.on('chat', function(username, message) {
  var coagulate = '[' + username + '] ' + message
  goodmessage = coagulate.replace(/</g, "(");
  data = goodmessage.replace(/>/g, ")");
  io.sockets.emit('new message', {msg:data} );

});
const fs = require('fs');

const log = require('./loganto')
const lastseen = require('./firstlastlogging/lastseen')
const firstseen = require('./firstlastlogging/firstseen')
const firstmessage = require('./firstlastlogging/firstmessage')
const addfriend = require('./addfriend')
const cuboyd = require('./cuboyd.js')
const translate1 = require('google-translate-api');
const translate = require('./translations.js')
var createall = require('./createall.js')
const moment = require('moment')
const path = require('path');
var tpaste = require('teknik-paste');
const MinecraftAPI = require('minecraft-api');
const isNumber = require('is-number');
var nodemailer = require('nodemailer');
const timeunit = require('timeunit')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'CHANGEME',
    pass: 'CHANGEME'
  }
});


var dontspamonlogin = false
var cooldownval = 1

function cooldownend() {
    cooldownval = 1
}

function cooldown(cooldowndelay) {
    cooldownval = 0
    setTimeout(cooldownend, cooldowndelay)
}
var aboutstr = 'If you are a newfag and joined after 10/16 then no bot for you :pepelaugh:'


function notificate() {
    bot.chat('>Do you think 6rl is a jewish monkey? Good, because so do I! https://discord.gg/fvVdajY Join the anti 6rl coalition')
}

function notificate2() {
    bot.chat('>Remember to drink your calcium DOOT DOOT')
}
function set() {
    dontspamonlogin = true
}
dontspamonlogin = false
setTimeout(set, 5000)

bot.on('login', function() {

    setInterval(notificate, 60000000)
	setInterval(notificate2, 38000000)

})
bot.on('chat', function(username, message) {

		if (!fs.existsSync('./MainStorage/playerdata/' + username + '/uuid.txt')) {
		console.log(1)
			MinecraftAPI.uuidForName(username)
	.then(uuid => {
		console.log(2)
		fs.writeFile('./MainStorage/playerdata/' + username + '/uuid.txt',  uuid, 'utf8', function(err) {if (err) throw err});
}).catch(err => console.log(err))
	}
    createall.createall(username)
    log.logall(username, message)
    firstseen.firstseen(username)
    lastseen.lastseen(username)
    firstmessage.firstmessage(username, message)
    addfriend.addfriend(username)
    console.log(username + ': ' + message)
    if (username != 'whispers') {
        function ResetJoinSet() {
            fs.writeFile('./MainStorage/playerdata/' + username + '/joinmsg/joinmsgstart.txt', 'false', 'utf8', function(err) {
                if (err) throw err;
            });
        }

        if (message == ":tps") {
            bot.chat('/tps')
        }
        var quotearray = fs.readFileSync('./MainStorage/quotes.txt', 'utf8').toString().split("\n");
        var randomNumber = Math.floor(Math.random() * quotearray.length);
        var truestatementsarray = fs.readFileSync('./MainStorage/truestatements.txt', 'utf8').toString().split("\n");
        var randomNumber1 = Math.floor(Math.random() * truestatementsarray.length);

        if (!fs.existsSync('./MainStorage/playerdata/' + username + '/banned.txt')) {
            x = 1
            if (x = 1) { // this is here to retract all the items that are finished and should not be edited
                if (message.startsWith(':notepad')) {
                    if (cooldownval != 0) {
                        var notepad = message.replace(':notepad', '');
                        fs.writeFile('./MainStorage/playerdata/' + username + '/notepad/notepad.txt', notepad + '\r\n', function(err) {
                            if (err) throw err;
                        });
                        cooldown(3000)
                    }
                }
                if (message == ':givenotepad') {
                    if (cooldownval != 0) {
                        if (fs.existsSync('./MainStorage/playerdata/' + username + '/notepad/notepad.txt')) {
                            var notepaddata = fs.readFileSync('./MainStorage/playerdata/' + username + '/notepad/notepad.txt', 'utf8')
                            bot.chat(notepaddata)
                            cooldown(3000)
                        }
                    }
                }
                if (message.startsWith(':firstseen')) {
                    if (cooldownval != 0) {

                        var firstseensplit = message.toString().split(" ")
                        var firstseenuser = firstseensplit[1]
                        if (fs.existsSync('./MainStorage/playerdata/' + firstseenuser + '/firstseen.txt')) {
                            var firstseendata = fs.readFileSync('./MainStorage/playerdata/' + firstseenuser + '/firstseen.txt', 'utf8')
                            bot.chat(firstseendata)
                        }
                        cooldown(3000)
                    }
                }
                if (message.startsWith(':lastseen')) {
                    if (cooldownval != 0) {

                        var lastseensplit = message.toString().split(" ")
                        var lastseenuser = lastseensplit[1]
                        if (!bot.players.hasOwnProperty(lastseenuser)) {
                            if (fs.existsSync('./MainStorage/playerdata/' + lastseenuser + '/lastseen.txt')) {
                                var lastseendata = fs.readFileSync('./MainStorage/playerdata/' + lastseenuser + '/lastseen.txt', 'utf8')
                                bot.chat(lastseendata)
                            }
                        }
                        if (bot.players.hasOwnProperty(lastseenuser)) {
                            bot.chat('this user is online')
                        }
                        cooldown(3000)
                    }
                }
                if (message.startsWith(':firstmessage')) {
                    if (cooldownval != 0) {
                        var firstmessagesplit = message.toString().split(" ")
                        var firstmessageuser = firstmessagesplit[1]
                        if (fs.existsSync('./MainStorage/playerdata/' + firstmessageuser + '/firstmessage.txt')) {
                            var firstmessagedata = fs.readFileSync('./MainStorage/playerdata/' + firstmessageuser + '/firstmessage.txt', 'utf8')
                            bot.chat(firstmessagedata)
                        }
                        cooldown(3000)
                    }
                }
                if (message == ':about') {
                    if (cooldownval != 0) {
                        bot.whisper(username, aboutstr)
                        cooldown(3000)
                    }
                }
                if (message == ':help') {
                    if (cooldownval != 0) {
                        bot.chat(':firstseen USERNAME :lastseen USERNAME :firstmessage USERNAME, :about COMMAND, /help 2 for more commands')
                        cooldown(3000)
                    }
                }
				if (message == ':overdose') {
					if (cooldownval != 0) {
						bot.chat('6rl had too many edibles as he is monkey :pepelaugh:')
						cooldown(3000)
					}
				}
				if (message == ':help 2') {
					if (cooldownval != 0) {
						bot.chat(':offlinechat USERNAME - sends a message to someone who is offline and when they login they will be messaged, /msg 6rlbot :offlinechat username (message here) same thing')
						cooldown(3000)
					}
				}
                if (message == '6rl is a') {
                    if (cooldownval != 0) {
                        bot.chat('MONKEY NIGGER DOOT DOOT')
                        cooldown(3000)
                    }
                }
                
                if (message.startsWith(':allow')) {
                    if (fs.existsSync('./MainStorage/playerdata/' + username + '/canallow.txt')) {
                        var allowsplit = message.toString().split(" ")
                        var allowuser = allowsplit[1]
                        var allowtoallow = allowsplit[2]
                        createall.createall(allowuser)
                        fs.writeFile('./MainStorage/playerdata/' + allowuser + '/can' + allowtoallow + '.txt', '<' + username + '>' + message, 'utf8', function(err) {
                            if (err) throw err;
                        });
                    }
                }
                if (message.startsWith(':can')) {
                    if (cooldownval != 0) {
                        var cansplit = message.toString().split(" ")
                        var canuser = cansplit[1]
                        var canthing = cansplit[2]
                        if (!fs.existsSync('./MainStorage/playerdata/' + canuser + '/' + 'can' + canthing + '.txt')) {
                            bot.chat(canuser + " can't " + canthing)
                        }
                        if (fs.existsSync('./MainStorage/playerdata/' + canuser + '/' + 'can' + canthing + '.txt')) {
                            bot.chat(canuser + ' can ' + canthing)
                        }
                        cooldown(3000)
                    }
                }
                if (message.startsWith(':ban')) {
                    if (fs.existsSync('./MainStorage/playerdata/' + username + '/canban.txt')) {
                        var bansplit = message.toString().split(" ")
                        var banuser = bansplit[1]
                        var bantoban = bansplit[2]
                        createall.createall(banuser)
                        fs.writeFile('./MainStorage/playerdata/' + banuser + '/banned.txt', '<' + username + '>' + message, 'utf8', function(err) {
                            if (err) throw err;
                        });
                    }
                }
                if (message.startsWith(':unban')) {
                    if (fs.existsSync('./MainStorage/playerdata/' + username + '/canunban.txt')) {
                        var unbansplit = message.toString().split(" ")
                        var unbanuser = unbansplit[1]
                        var unbantoban = unbansplit[2]
                        createall.createall(banuser)
                        fs.unlinkSync('./MainStorage/playerdata/' + unbanuser + '/banned.txt')
                    }
                }
                if (message == ':createpastelog') {
                    if (cooldownval != 0) {
                        var fulllogs = fs.readFileSync('./MainStorage/totallogs.txt', 'utf8')
                        tpaste.paste({
                            title: '6rlisnut',
                            code: fulllogs
                        }, function(link1, err) {
                            if (err) {
                                bot.chat(err)
                            }

                        });
                        cooldown(3000)
                    }

                }
                if (message.startsWith(':offlinechat')) {
                    if (cooldownval != 0) {
                        var joinmsgsplit = message.toString().split(" ")
                        var joinmsguser = joinmsgsplit[1]
                        if (joinmsguser == undefined) {
                            bot.whisper(username, "you must specify a user, like this, :offlinechat " + username)
                        }
                        if (joinmsguser != undefined) {
                            fs.writeFile('./MainStorage/playerdata/' + username + '/joinmsg/joinmsgstart.txt', 'true ' + joinmsguser, 'utf8', function(err) {
                                if (err) throw err;
                            });
                            bot.whisper(username, "message 6rlbot the contents of your offlinechat message")
                            setTimeout(ResetJoinSet, 45000)
                        }
                    }
                    cooldown(3000)
                }

    }
	if(message == ':randomhex') {
		bot.chat(Math.floor(Math.random()*16777215).toString(16))
	}
	}
	})

bot.on('message', function(jsonMsg) {})

bot.on('whisper', function(username, message) {
    console.log('WHISPER: ' + username + ': ' + message)
	createall.createall(username)
    function ResetJoinSet() {
        fs.writeFile('./MainStorage/playerdata/' + username + '/joinmsg/joinmsgstart.txt', 'false', 'utf8', function(err) {
            if (err) throw err;
        });
    }
    if (fs.existsSync('./MainStorage/playerdata/' + username + '/joinmsg/joinmsgstart.txt')) {

        var joindata = fs.readFileSync('./MainStorage/playerdata/' + username + '/joinmsg/joinmsgstart.txt', 'utf8')
        if (joindata.startsWith('true')) {
            var joindatasplit = joindata.toString().split(" ")
            var joindatauser = joindatasplit[1]
            createall.createall(joindatauser)
            if (fs.existsSync('./MainStorage/playerdata/' + joindatauser + '/joinmsg/joinmsgcount.txt')) {
                if (cooldownval != 0) {
                    fs.readdir('./MainStorage/playerdata/' + joindatauser + '/joinmsg/joinmessages', (err, files) => {
                        bot.whisper(username, 'your message to ' + joindatauser + ' has been sent!')
                        fs.writeFile('./MainStorage/playerdata/' + joindatauser + '/joinmsg/joinmessages/joinmsg' + files.length + '.txt', ' sentby: ' + username + ' at :' + ' to: ' + joindatauser + ' message: ' + message, 'utf8', function(err) {
                            if (err) throw err;
                        });
                        fs.appendFile('./MainStorage/playerdata/' + joindatauser + '/joinmsg/joinmessages/joinmsglog.txt', ' sentby: ' + username + ' at :' + moment().format('MMMM Do YYYY, h:mm:ss a') + ' message: ' + message + '\r\n', 'utf8', function(err) {
                            if (err) throw err;
                        });
                        fs.writeFile('./MainStorage/playerdata/' + joindatauser + '/joinmsg/joinmsgstart.txt', 'false', 'utf8', function(err) {
                            if (err) throw err;
                        });

                    });
                }
            }
        }
    }
    var checkfalsedata = fs.readFileSync('./MainStorage/playerdata/' + username + '/joinmsg/joinmsgstart.txt', 'utf8')
    if (checkfalsedata == 'false') {
        if (message.startsWith('joinmsg')) {

            if (fs.existsSync('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages/' + message + '.txt')) {
                var joinmsgdata = fs.readFileSync('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages/' + message + '.txt', 'utf8')
                console.log('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages/' + message + '.txt')
                bot.whisper(username, joinmsgdata)
                fs.readdir('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages', (err, files) => {
                    fs.appendFile('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages/joinmsglog.txt', '----' + message + 'was read----\r\n', 'utf8', function(err) {
                        if (err) throw err;
                    });
                    fs.writeFile('./MainStorage/playerdata/' + username + '/joinmsg/joinmsgcount.txt', files.length, 'utf8', function(err) {
                        if (err) throw err;
                    });
                    fs.unlinkSync('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages/' + message + '.txt')
                })
            }
        }
        if (message == ':offlinechats') {
            if (cooldownval != 0) {
                if (fs.existsSync('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages/joinmsg1.txt')) {
                    console.log('okcalled' + username)
                    fs.readdir('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages', (err, files) => {
                        bot.whisper(username, 'you have' + files.length + 'unread messages, to read them type joinmsg1-' + files.length + ' to read them individually or do !createpastelog to get a paste of all of them')
                    })

                }
                if (!fs.existsSync('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages/joinmsg1.txt')) {
                    bot.whisper(username, 'you dont have any messages')
                }
                cooldown(3000)
            }
        }
        if (message == ':nonotifications') {
            fs.writeFile('./MainStorage/playerdata/' + username + '/nonotifications.txt', '', 'utf8', function(err) {
                if (err) throw err;
            });
        }
        if (message == ':yesnotifications') {
            fs.unlinkSync('./MainStorage/playerdata/' + username + '/nonotifications.txt')
        }
        if (message == ':createpastelog') {
            if (cooldownval != 0) {
                if (fs.existsSync('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages/joinmsglog.txt')) {
                    var joinmsglogs = fs.readFileSync('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages/joinmsglog.txt', 'utf8')
                    fs.appendFile('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages/joinmsglog.txt', '----' + 'ALL MESSAGES WERE READ AND DELETED----\r\n', 'utf8', function(err) {
                        if (err) throw err;
                    });



                    fs.readdir('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages', (err, files) => {
                        if (err) {
                            console.log(err);
                        }

                        files.forEach(file => {
                            const fileDir = path.join('./MainStorage/playerdata/' + username + '/joinmsg/joinmessages', file);

                            if (file !== 'joinmsglog.txt') {
                                fs.unlinkSync(fileDir);
                            }
                        });
                    });

                    tpaste.paste({
                        title: 'doNOTSHARE',
                        code: joinmsglogs
                    }, function(link1, error) {
                        if (error) {
                            bot.whisper(username, error)
                        }
                    });

                    cooldown(3000)
                }
            }

        }
        if (message.startsWith(':offlinechat ')) {
            if (cooldownval != 0) {
                var joinmsgsplit = message.toString().split(" ")
                var joinmsguser = joinmsgsplit[1]
                var joinmsgmessage = joinmsgsplit[2]
                if (joinmsgmessage == undefined) {
                    if (joinmsguser == undefined) {
                        bot.whisper(username, "you must specify a user, like this, :joinmessage " + username)
                    }
                    if (joinmsguser != undefined) {
                        fs.writeFile('./MainStorage/playerdata/' + username + '/joinmsg/joinmsgstart.txt', 'true ' + joinmsguser, 'utf8', function(err) {
                            if (err) throw err;
                        });
                        bot.whisper(username, "message 6rlbot the contents of your join message")
                        setTimeout(ResetJoinSet, 45000)
                    }
                }
                if (joinmsgmessage != undefined) {
                    fs.readdir('./MainStorage/playerdata/' + joinmsguser + '/joinmsg/joinmessages', (err, files) => {
                        var joinmsgreplace = message.replace(':offlinechat ' + joinmsguser, '');
                        bot.whisper(username, 'your message to ' + joinmsguser + ' has been sent!')
                        var joinmessagereplace = joinmsgreplace
                        fs.writeFile('./MainStorage/playerdata/' + joinmsguser + '/joinmsg/joinmessages/joinmsg' + files.length + '.txt', ' sentby: ' + username + ' at :' + ' to: ' + joinmsguser + ' message: ' + joinmessagereplace, 'utf8', function(err) {
                            if (err) throw err;
                        });
                        fs.appendFile('./MainStorage/playerdata/' + joinmsguser + '/joinmsg/joinmessages/joinmsglog.txt', ' sentby: ' + username + ' at :' + moment().format('MMMM Do YYYY, h:mm:ss a') + ' message: ' + joinmessagereplace + '\r\n', 'utf8', function(err) {
                            if (err) throw err;
                        });
                        fs.writeFile('./MainStorage/playerdata/' + joinmsguser + '/joinmsg/joinmsgstart.txt', 'false', 'utf8', function(err) {
                            if (err) throw err;
                        });
                    });
                }
                //dont edit below this
                cooldown(3000)
            }
        }

bot.on('playerJoined', function(player) {
    createall.createall(player.username)
    lastseen.lastseen(player.username)
    if (dontspamonlogin == true) {
        console.log(dontspamonlogin)
        if (!fs.existsSync('./MainStorage/playerdata/' + player.username + '/nonotifications.txt')) {
            if (fs.existsSync('./MainStorage/playerdata/' + player.username + '/joinmsg/joinmessages/joinmsg1.txt')) {
                fs.readdir('./MainStorage/playerdata/' + player.username + '/joinmsg/joinmessages', (err, files) => {
                    bot.whisper(player.username, 'you have ' + files.length + ' unread messages, type /msg 6rl :offlinechats to read them, and to disable these notifications type /msg 6rlbot :nonotifications')
                    console.log('called')
                })
            }
        }
        addfriend.addfriend(player.username)
        firstseen.firstseen(player.username)
        if (player.username == "CuBoyd") {
            fs.appendFile('./cuboyddata.txt', 'cuboyd joined at ' + moment().format('MMMM Do YYYY, h:mm:ss a'), 'utf8', function(err) {
                if (err) throw err;
            });
        }
    }
})

bot.on('playerLeft', function(player) {
    createall.createall(player.username)
    lastseen.lastseen(player.username)
})
bot.on('end', function() {




    process.exit()
})
bot.on('error', err=> console.log(err))
