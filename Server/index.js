require("dotenv").config()
const Solace = require('solclientjs').debug

const Config = require("../config.js")

let factoryProps = new Solace.SolclientFactoryProperties()
factoryProps.profile = Solace.SolclientFactoryProfiles.version10
Solace.SolclientFactory.init(factoryProps)
Solace.SolclientFactory.setLogLevel(Solace.LogLevel.WARN)

let conn = {
  url: `ws://${Config.solace_host}:${Config.solace_port}`,
  vpnName: Config.solace_vpn,
  userName: Config.solace_username,
  password: Config.solace_password,
  connectRetries: parseInt(Config.solace_connect_retries),
  connectTimeoutInMsecs: parseInt(Config.solace_connect_timeout_in_mssec),
  reconnectRetries: parseInt(Config.solace_reconnect_retries),
  reconnectRetryWaitInMsecs: parseInt(Config.solace_reconnect_timeout_in_mssec),
  publisherProperties: {
    acknowledgeMode: Solace.MessagePublisherAcknowledgeMode.PER_MESSAGE
  }
}
let session = Solace.SolclientFactory.createSession(conn)
session.connect()
session
.on(Solace.SessionEventCode.UP_NOTICE, (sessionEvent) => {
  console.log('connected')
})
.on(Solace.SessionEventCode.CONNECT_FAILED_ERROR, (sessionEvent) => {
  console.log('Connection failed to the message router: ' + sessionEvent.infoStr) 
  console.log(' - check correct parameter values and connectivity!')
  console.log(conn)
})
.on(Solace.SessionEventCode.DISCONNECTED, function (sessionEvent) {
  console.log('Disconnected.')
  if (session !== null) {
    session.dispose()
    session = null
  }
})

let publisher = { 
  session: null,
  topicName: "chatroom/get/chat_list"
}