// ipfsData.helper.js

const ipfsAPI = require('ipfs-api');

const ipfs = ipfsAPI({ host: '172.17.0.1', port: '5001', protocol: 'http' });
const Log = require('log');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const log = new Log('debug');
const repositoryName = '[IPFS Data Helper]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getData(hash) {
  try {
    log.info(`----->IN ${repositoryName} ${getData.name}, with params ${hash}`);
    const files = await ipfs.files.get(hash);
    const fileStringData = JSON.stringify(files[0].content.toString('utf8'));
    const result = JSON.parse(fileStringData);
    return result;
  } catch (error) {
    log.error(`----->OUT ${repositoryName} ${getData.name} (ERROR): File not found`);
    throw error;
  }
}

async function insertData(document) {
  try {
    log.info(`----->IN ${repositoryName} ${insertData.name}`);
    const result = await ipfs.files.add(document);
    log.info(`----->OUT ${repositoryName} ${insertData.name}, ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    log.error(`----->OUT ${repositoryName} ${insertData.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}

async function removeData(documentName) {
  try {
    log.info(`----->IN ${repositoryName} ${removeData.name}`);
    const fullPath = documentName;
    const result = await ipfs.files.rm(fullPath);
    log.info(`----->OUT ${repositoryName} ${removeData.name}, ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    log.error(`----->OUT ${repositoryName} ${removeData.name} (ERROR): ${JSON.stringify(error.stack)}`);
    throw error;
  }
}


module.exports = {
  getData,
  insertData,
  removeData,
};
