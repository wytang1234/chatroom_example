module.exports = {
  solace_host: process.env.SOLACE_HOST,
  solace_port: process.env.SOLACE_PORT,
  solace_vpn: process.env.SOLACE_VPN,
  solace_username: process.env.SOLACE_USERNAME,
  solace_password: process.env.SOLACE_PASSWORD,
  solace_connect_retries: process.env.SOLACE_CONNECT_RETRIES,
  solace_connect_timeout_in_mssec: process.env.SOLACE_CONNECT_TIMEOUT_IN_MESSEC,
  solace_reconnect_retries: process.env.SOLACE_RECONNECT_RETRIES,
  solace_reconnect_timeout_in_mssec: process.env.SOLACE_RECONNECT_TIMEOUT_IN_MESSEC,
  solace_pre_message: process.env.SOLACE_PRE_MESSAGE
}