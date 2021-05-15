let data_chat_list = require("../Data/chat_list.json")
let data_message = require("../Data/message.json")
let data_user = require("../Data/user.json")

module.exports = async ({ uuid, to_arr, message, socket_id }, socket, io) => { 
  console.log(uuid, "req_push_message")

  // Get chatroom
  let selected_chatroom = data_chat_list.find((x) => { return arraysEqual(x.member, to_arr.concat([ uuid ])) })
  let member = sort(to_arr.concat([ uuid ]))
  if(!selected_chatroom){
    selected_chatroom = {
      member, 
      chat_token: `CHAT${data_chat_list.length+1}`,
      last_message: {},
      socket_id: [ socket_id ],
      create_date: new Date(),
      last_update: new Date(),
      id: data_chat_list.length+1
    }
    data_chat_list.push(selected_chatroom)
    console.log("New chatroom", selected_chatroom.chat_token)
  }else{ 
    selected_chatroom.last_update = new Date
    console.log("Existing chatroom", selected_chatroom.chat_token) 
  }

  // Push new message
  let new_message = {
    message, uuid,
    chat_token: selected_chatroom.chat_token,
    message_token: `MSG${data_message.length+1}`,
    seen_member: [ uuid ],
    create_date: new Date(),
    id: data_message.length+1
  }
  data_message.push(new_message)
  socket.emit('res_push_message', "OK")

  // Emit group member
  member.forEach((x) => {
    let existing_user = data_user.find((y) => { return x == y.uuid })
    if(existing_user){
      existing_user.socket_id.forEach((socket_id) => {
        // Get chat list
        let selected_chat_list = data_chat_list.filter((y) => { return y.member.includes(x) })
        if(selected_chat_list.length){
          selected_chat_list = selected_chat_list.map((y) => {
            let message_list = data_message.filter((z) => { return y.chat_token == z.chat_token })
            console.log(message_list)
            let last_id = message_list.map((e) => { return e.id }).sort().reverse()[0]
            y.last_message = message_list.find((z) => { return z.id == last_id })
            return y
          })
          socket.broadcast.to(socket_id).emit('res_chat_list', selected_chat_list)
          socket.broadcast.to(socket_id).emit('test', `new message`)
        }
      }) 
    }
  })
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  a = sort(a)
  b = sort(b)

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function sort(arr){
  const rearrangeId = uuid => {
    let [low, mid, hiAndVersion] = uuid.split('-')

    return [hiAndVersion, mid, low].join('')
  }

  // Sorting, using our rearrange function
  return arr.sort((id1, id2) => {
    let rearranged1 = rearrangeId(id1)
    let rearranged2 = rearrangeId(id2)

    if (rearranged1 > rearranged2) { return 1 }

    return -1
  })
}