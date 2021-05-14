require("dotenv").config();
const app = require('express')()

const Config = require("../config.js")
const add_message = require('./add_message.js')
const get_chat_list = require('./get_chat_list.js')
const get_chat_history = require('./get_chat_history.js')

const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: { origin: '*' }})
io.on('connection', function (socket) {
  socket.on('req_push_message', (data) => { add_message(data, socket, io) })
  socket.on('req_chat_list', (data) => { get_chat_list(data, socket, io) })
  socket.on('get_chat_history', (data) => { get_chat_history(data, socket, io) })
});
server.listen(3000, () => { console.log(`Socket Server listening on 0.0.0.0:${ 3000 }!`) });
