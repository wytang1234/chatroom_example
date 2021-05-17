let data_chat_list = require("../Data/chat_list.json")
let data_message = require("../Data/message.json")
let data_user = require("../Data/user.json")

module.exports = async ({ uuid, socket_id }, socket, io) => { 
  console.log(uuid, "req_chat_list")

  // Get chat list
  let selected_chat_list = data_chat_list.filter((x) => { return x.member.includes(uuid) })
  if(selected_chat_list.length){
    selected_chat_list = selected_chat_list.map((x) => {
      let message_list = data_message.filter((y) => { return x.chat_token == y.chat_token })
      let last_msg = message_list.map(function(e) { return e.create_date }).sort().reverse()[0]
      x.last_message = message_list.find((x) => { return x.create_date.toString() == last_msg })
      return x
    })
  }
  socket.emit('res_chat_list', selected_chat_list)

  // Update socket_id
  let user = data_user.find((x) => { return x.uuid == uuid })
  if(user){
    user.socket_id.push(socket_id)
  }else{
    data_user.push({
      uuid,
      socket_id: [ socket_id ]
    })
  }
}