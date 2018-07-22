// ipfs.helper.js

// //////////////////////////////////////////////////////////////////////////////
// Requires
// //////////////////////////////////////////////////////////////////////////////
const ipfsAPI = require('ipfs-api');
const fileType = require('file-type');
const Log = require('log');
const multiaddr = require('multiaddr');
const axios = require('axios');

// //////////////////////////////////////////////////////////////////////////////
// IPFS environment
// //////////////////////////////////////////////////////////////////////////////
const ipfsHost = process.env.IPFS_HOST;
const ipfsPort = process.env.IPFS_PORT;
const ipfsProtocol = process.env.IPFS_PROTOCOL;
const ipfsConfig = { host: ipfsHost, port: ipfsPort, protocol: ipfsProtocol };

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const log = new Log('debug');
const ipfs = ipfsAPI(ipfsConfig);
const repositoryName = '[IPFS Helper]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////
// HEALTHCHECK FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getNodeId() {
  try {
    log.info(`----->IN ${repositoryName} ${getNodeId.name} -> Configuration IPFS_API : ${JSON.stringify(ipfsConfig)}`);

    const result = await ipfs.id();

    log.info(`----->OUT ${repositoryName} ${getNodeId.name} ${JSON.stringify(result)}`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${repositoryName} ${getNodeId.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}

// //////////////////////////////////////////////////////////////////////////////
// CONFIGURATION FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getConfiguration() {
  try {
    log.info(`----->IN ${repositoryName} ${getConfiguration.name} -> Configuration IPFS_API : ${JSON.stringify(ipfsConfig)}`);

    const result = await ipfs.config.get();

    log.info(`----->OUT ${repositoryName} ${getConfiguration.name}, (Success)`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${repositoryName} ${getConfiguration.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}

// //////////////////////////////////////////////////////////////////////////////
// NETWORK FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getNetworkConfig() {
  try {
    log.info(`----->IN ${repositoryName} ${getNetworkConfig.name} -> Configuration IPFS_API : ${JSON.stringify(ipfsConfig)}`);

    const result = {
      bootstrapPeers: await ipfs.bootstrap.list(),
      swarmPeers: await ipfs.swarm.addrs(),
    };

    log.info(`----->OUT ${repositoryName} ${getNetworkConfig.name} ${JSON.stringify(result)}`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${repositoryName} ${getNetworkConfig.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}

async function addPeer(ip) {
  try {
    log.info(`----->IN ${repositoryName} ${addPeer.name} -> Configuration IPFS_API : ${JSON.stringify(ipfsConfig)}`);
    log.info(`-----> Peer IP -> ${ip}`);

    // Obtain peer info from Peer IP
    const peerInfo = await axios.get(`http://${ip}:5001/api/v0/id`);

    // Connection multiaddress peer
    const connection = `/ip4/${ip}/tcp/4001/ipfs/${peerInfo.data.ID}`;

    log.info(`----->Peer Connection ${connection}`);

    const addr = multiaddr(connection);

    const result = await ipfs.bootstrap.add(addr.toString());

    log.info(`----->OUT ${repositoryName} ${addPeer.name} ${JSON.stringify(result)}`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${repositoryName} ${addPeer.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}

// //////////////////////////////////////////////////////////////////////////////
// FILE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getFile(hash) {
  try {
    log.info(`----->IN ${repositoryName} ${getFile.name} -> Configuration IPFS_API : ${JSON.stringify(ipfsConfig)} , with params ${hash}`);

    // Call IPFS library to obtain File with File Hash
    const files = await ipfs.files.get(hash);

    const result = {};

    // Create response with File Type and File Content
    files.forEach((file) => {
      const type = fileType(file.content);
      result.type = type.mime;
      result.content = file.content;
    });

    log.info(`----->OUT ${repositoryName} ${getFile.name} (Success) -> File found`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${repositoryName} ${getFile.name} (ERROR): File not found`);
    throw error;
  }
}

async function addFile(document) {
  try {
    log.info(`----->IN ${repositoryName} ${addFile.name} -> Configuration IPFS_API : ${JSON.stringify(ipfsConfig)} `);

    // Call IPFS library to add new file in IPFS system
    const result = await ipfs.files.add(document);

    log.info(`----->OUT ${repositoryName} ${addFile.name}, ${JSON.stringify(result)}`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${repositoryName} ${addFile.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}

module.exports = {
  getNodeId,
  getConfiguration,
  getNetworkConfig,
  addPeer,
  getFile,
  addFile,
};
