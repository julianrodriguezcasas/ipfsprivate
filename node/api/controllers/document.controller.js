// document.controller.js

const Log = require('log');
const documentService = require('../services/document.service');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const controllerName = '[Document controller]';
const log = new Log('debug');
// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getData(req, res) {
  try {
    log.info(`----->IN ${controllerName} ${getData.name}, Hash Document : ${req.query.hash}`);
    const hash  = req.query.hash;
    const result = await documentService.getDataFromIPFS(hash);
    log.info(`----->OUT ${controllerName} ${getData.name}, (Success) File found ${JSON.stringify(result)}`);
    res.status(200).send(result);
  } catch (error) {
    log.error(`----->OUT ${controllerName} ${getData.name}, (ERROR) : ${error}`);
    res.status(500).send({ message: 'File not found' });
  }
}

async function insertDocument(req, res) {
  try {
    log.info(`----->IN ${controllerName} ${insertDocument.name}`);
    const document = req.swagger.params.newDocument.raw.buffer;
    const result = await documentService.insertData(document);
    log.info(`----->OUT ${controllerName} ${insertDocument.name}, (Success) File inserted, Hash file -> ${result[0].hash}`);
    res.status(200).send({ Success: result[0].hash });
  } catch (error) {
    log.error(`----->OUT ${controllerName} ${insertDocument.name}, ${error}`);
    res.status(500).send({ message: 'Failed inserting document' });
  }
}

async function removeDocument(req, res) {
  try {
    log.info(`----->IN ${controllerName} ${removeDocument.name}`);
    const { documentName } = req.body.documentName;
    const result = await documentService.removeData(documentName);
    log.info(`----->OUT ${controllerName} ${removeDocument.name}, (Success) File removed-> ${result}`);
    res.status(200).send({ Success: result });
  } catch (error) {
    log.error(`----->OUT ${controllerName} ${insertDocument.name}, ${error}`);
    res.status(500).send({ message: 'Failed removing document' });
  }
}


module.exports = {
  getData,
  insertDocument,
  removeDocument,
};
