let data_chat_list = require("../Data/chat_list.json")
let data_message = require("../Data/message.json")

module.exports = async ({ uuid, to_arr, message, socket_id }, socket, io) => { 
  console.log(uuid, "req_push_message")

  // Get chatroom
  let selected_chatroom = data_chat_list.find((x) => { return arraysEqual(x.member, to_arr.concat([ uuid ])) })
  if(!selected_chatroom){
    selected_chatroom = {
      "member": sort(to_arr.concat([ uuid ])), 
      "chat_token": `CHAT${data_chat_list.length+1}`,
      "last_message": {},
      "create_date": new Date(),
      "last_update": new Date()
    }
    data_chat_list.push(selected_chatroom)
    console.log("New chatroom", selected_chatroom)
  }else{ console.log("Existing chatroom", selected_chatroom) }

  // Push new message
  let new_message = {
    message, uuid,
    chat_token: selected_chatroom.chat_token,
    message_token: `MSG${data_message.length+1}`,
    seen_member: [ uuid ],
    create_date: new Date()
  }
  data_message.push(new_message)
  socket.emit('res_push_message', "OK")
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