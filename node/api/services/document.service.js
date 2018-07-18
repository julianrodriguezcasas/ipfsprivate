// document.service.js

const Log = require('log');
const dataHelper = require('../helpers/ipfsData.helper');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const serviceName = '[Document service]';
const log = new Log('debug');

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////
async function getDataFromIPFS(hash) {
  try {
    log.info(`----->IN ${serviceName} ${getDataFromIPFS.name}, with params : ${hash}`);
    const result = await dataHelper.getData(hash);
    log.info(`----->OUT ${serviceName} ${getDataFromIPFS.name}, (Success) File found ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    log.error(`----->OUT ${serviceName} ${getDataFromIPFS.name} (ERROR): File not found`);
    throw error;
  }
}

async function insertData(document) {
  try {
    log.info(`----->IN ${serviceName} ${insertData.name}`);
    const result = await dataHelper.insertData(document);
    log.info(`----->OUT ${serviceName} ${insertData.name}, (Success) File inserted ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    log.error(`----->OUT ${serviceName} ${insertData.name} (ERROR): Failed inserting a new file`);
    throw error;
  }
}

async function removeData(documentName) {
  try {
    log.info(`----->IN ${serviceName} ${removeData.name}`);
    const result = await dataHelper.removeData(documentName);
    log.info(`----->OUT ${serviceName} ${removeData.name}, (Success) File removed ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    log.error(`----->OUT ${serviceName} ${removeData.name} (ERROR): Failed removing a file`);
    throw error;
  }
}

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

module.exports = {
  getDataFromIPFS,
  insertData,
  removeData,
};
