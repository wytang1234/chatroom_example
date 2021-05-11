module.exports = async ({ uuid, socket_id }, socket, io) => { 
  console.log("[GET CHAT_HISTORY]", uuid)
  socket.emit('get_chat_history', `hi ${uuid}`)
  // io.sockets.in(account_number).emit('get_room_result', { account_number, socket_id })
}