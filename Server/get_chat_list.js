module.exports = (Solace, session, message) => {
  let topic_name = (message.getDestination().getName())
  let uuid = topic_name.split("/")[1]

  console.log("[REQ]", "chat_list", uuid)
  let new_message = Solace.SolclientFactory.createMessage()
  new_message.setDestination(Solace.SolclientFactory.createTopicDestination(`res_chat_list/${uuid}`))
  let output = [
    {
      member: [
        "4d0ec78d-b0ac-464c-81df-391176feed7d",
        "166bb261-51d3-4c9e-ab45-0a3ad76e1f81",
      ], 
      chat_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXIiOlsiNGQwZWM3OGQtYjBhYy00NjRjLTgxZGYtMzkxMTc2ZmVlZDdkIiwiMTY2YmIyNjEtNTFkMy00YzllLWFiNDUtMGEzYWQ3NmUxZjgxIl19.IjYbtadXOLgNrVwF4F2Q4yYg7SBdY--HfzIG3xJDln4",
      last_message: {
        uuid: "166bb261-51d3-4c9e-ab45-0a3ad76e1f81",
        message: "hi",
        seen_member:[],
        create_date: new Date("2021-01-27 00:00:00")
      },
      create_date: new Date("2021-01-26 00:00:00")
    },
    {
      member: [
        "4d0ec78d-b0ac-464c-81df-391176feed7d",
        "37d31c31-9a43-44e4-9194-d9601704adc7",
      ], 
      chat_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXIiOlsiNGQwZWM3OGQtYjBhYy00NjRjLTgxZGYtMzkxMTc2ZmVlZDdkIiwiMTY2YmIyNjEtNTFkMy00YzllLWFiNDUtMGEzYWQ3NmUxZjgxIl19.IjYbtadXOLgNrVwF4F2Q4yYg7SBdY--HfzIG3xJDln4",
      last_message: {
        uuid: "166bb261-51d3-4c9e-ab45-0a3ad76e1f81",
        message: "jm9",
        seen_member:[],
        create_date: new Date("2021-01-26 16:00:00")
      },
      create_date: new Date("2021-01-26 00:00:00")
    }
  ]
  new_message.setBinaryAttachment(JSON.stringify(output))
  new_message.setDeliveryMode(Solace.MessageDeliveryModeType.DIRECT)
  session.send(new_message)
  console.log("[RES]", "chat_list", uuid)
}



// REQ: {"type": "request_for_history"}

// RESPONSE: {type: "response_for_history", msg: {} }