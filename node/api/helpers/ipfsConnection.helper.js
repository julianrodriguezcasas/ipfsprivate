// ipfsConnection.helper.js

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

// Variables entorno IPFS
const ipfsHost = process.env.IPFS_HOST;
const ipfsPort = process.env.IPFS_PORT;
const ipfsProtocol = process.env.IPFS_PROTOCOL;
const ipfsConfig = { host: ipfsHost, port: ipfsPort, protocol: ipfsProtocol };

const ipfsAPI = require('ipfs-api');

const ipfs = ipfsAPI(ipfsConfig);
const Log = require('log');


// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const log = new Log('debug');
const repositoryName = '[IPFS Connection Helper]';


// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getIPFSStat() {
  try {
    log.info(`----->IN ${repositoryName} ${getIPFSStat.name} -> Configuration ${JSON.stringify(ipfsConfig)}`);
    const result = await ipfs.id();
    log.info(`----->OUT ${repositoryName} ${getIPFSStat.name} ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    log.error(`----->OUT ${repositoryName} ${getIPFSStat.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}

module.exports = {
  getIPFSStat,
};
