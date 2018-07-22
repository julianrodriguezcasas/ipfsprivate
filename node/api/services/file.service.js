// file.service.js

const Log = require('log');
const ipfsHelper = require('../helpers/ipfs.helper');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const serviceName = '[File service]';
const log = new Log('debug');

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////
async function getFileFromIPFS(hash) {
  try {
    log.info(`----->IN ${serviceName} ${getFileFromIPFS.name}, Parameters : ${hash}`);

    const result = await ipfsHelper.getFile(hash);

    log.info(`----->OUT ${serviceName} ${getFileFromIPFS.name}, (Success) -> File found`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${serviceName} ${getFileFromIPFS.name} (ERROR) -> File not found`);
    throw error;
  }
}

async function addFile(document) {
  try {
    log.info(`----->IN ${serviceName} ${addFile.name}`);

    const result = await ipfsHelper.addFile(document);

    log.info(`----->OUT ${serviceName} ${addFile.name}, (Success) File inserted ${JSON.stringify(result)}`);

    return result;
  } catch (error) {
    log.error(`----->OUT ${serviceName} ${addFile.name} (ERROR): Failed inserting a new file`);
    throw error;
  }
}

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

module.exports = {
  getFileFromIPFS,
  addFile,
};
