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

async function setNetworkConfig(ip) {
  try {
    log.info(`----->IN ${serviceName} ${setNetworkConfig.name}`);

    const result = await ipfsHelper.setNetworkConfig(ip);

    log.info(`----->OUT ${serviceName} ${setNetworkConfig.name} Success`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${serviceName} ${setNetworkConfig.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

module.exports = {
  getNetworkConfig,
  setNetworkConfig,
};
