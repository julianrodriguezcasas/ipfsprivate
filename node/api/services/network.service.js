// network.service.js

const Log = require('log');
const ipfsHelper = require('../helpers/ipfs.helper');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const serviceName = '[Network service]';
const log = new Log('debug');

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getNetworkConfig() {
  try {
    log.info(`----->IN ${serviceName} ${getNetworkConfig.name}`);

    const result = await ipfsHelper.getNetworkConfig();

    log.info(`----->OUT ${serviceName} ${getNetworkConfig.name} Success`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${serviceName} ${getNetworkConfig.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}

async function addPeer(ip) {
  try {
    log.info(`----->IN ${serviceName} ${addPeer.name}, Peer IP : ${ip}`);

    const result = await ipfsHelper.addPeer(ip);

    log.info(`----->OUT ${serviceName} ${addPeer.name} Success`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${serviceName} ${addPeer.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

module.exports = {
  getNetworkConfig,
  addPeer,
};
