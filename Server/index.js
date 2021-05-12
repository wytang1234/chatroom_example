require("dotenv").config()
const Solace = require('solclientjs').debug

const Config = require("../config.js")
const get_chat_list = require("./get_chat_list.js")

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
    session.subscribe(Solace.SolclientFactory.createTopic(`req_chat_list/*`), true, `req_chat_list/*`, 10000)

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
  .on(Solace.SessionEventCode.MESSAGE, ( message ) => { 

    let topic_name = (message.getDestination().getName())
    console.log(topic_name.includes("req_chat_list"), topic_name)
    if(topic_name.includes("req_chat_list")){
      get_chat_list(Solace, session, message) 
    }
  }
  // {
  //   let topic_name = (message.getDestination().getName())
  //   var msg_result = JSON.parse(message.getBinaryAttachment());
  //   console.log(msg_result)

  //   if(topic_name.includes("chat_list")){
  //     let uuid = topic_name.split("/")[1]
  //     // console.log(uuid, "@@@")
  //   }
  // }
  )