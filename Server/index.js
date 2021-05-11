require("dotenv").config()
const Solace = require('solclientjs').debug

const Config = require("../config.js")

let factoryProps = new Solace.SolclientFactoryProperties()
factoryProps.profile = Solace.SolclientFactoryProfiles.version10
Solace.SolclientFactory.init(factoryProps)
Solace.SolclientFactory.setLogLevel(Solace.LogLevel.WARN)

let session = Solace.SolclientFactory.createSession({
  url: `wss://${Config.solace_host}:${Config.solace_port}`,
  vpnName: Config.solace_vpn,
  userName: Config.solace_username,
  password: Config.solace_password,
  connectRetries: parseInt(Config.solace_connect_retries),
  connectTimeoutInMsecs: parseInt(Config.solace_connect_timeout_in_mssec),
  reconnectRetries: parseInt(Config.solace_reconnect_retries),
  reconnectRetryWaitInMsecs: parseInt(Config.solace_reconnect_timeout_in_mssec),
  publisherProperties: {
    acknowledgeMode: Config.solace_pre_message
  }
})
session.connect()