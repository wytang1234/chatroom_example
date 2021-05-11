module.exports = async ({ uuid, socket_id }, socket, io) => { 
  console.log(uuid, "get_chat_list")
  socket.emit('get_chat_list_result', 
    [
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
  )
}