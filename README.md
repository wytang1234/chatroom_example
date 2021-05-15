- Reminder
	- No Mongo
	- No Mysql
	- No Redis
	- A simple websocket
	
- Init
	- ```npm install```

- Server Side
	- ```node Server/index.js``` or ```npm start```

- Client Side
	- User1
		- Client/get_chat_list.html?uuid=166bb261-51d3-4c9e-ab45-0a3ad76e1f81
	- User2
		- Client/get_chat_list.html?uuid=8c6c0f69-5069-41db-86e1-afaf72dc5591

- ToDo
	- new message sound / CSS
		- Server: 
			- `Server/get_chat_history.js`
		- Client: 
			- `Client/get_chat_list.html`
			- `Client/private_chat.html`
- Working
	- remove disconnect socket
		- ref
			- https://stackoverflow.com/questions/24463447/socket-io-disconnect-client-by-id