'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');


const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);






var osc       =     require('node-osc');
var client 	= 		new osc.Client('127.0.0.1', PORT);
// ========== Data ========== //
//Sends OSC message when button is clicked
io.sockets.on('connection', function(socket){
  socket.on('send message', function(data){
    var oscNum = Math.random();
    var oscMap = '/composition/video/effect3/opacity/values ' + oscNum;

    client.send('/composition/video/effect3/opacity/values', oscNum);
    console.log(oscMap);
  });
});
