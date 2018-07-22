// file.controller.js

const Log = require('log');
const fileService = require('../services/file.service');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const controllerName = '[File controller]';
const log = new Log('debug');
// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getFile(req, res) {
  try {
    // Params IN -> Hash File
    const { hash } = req.query;

    log.info(`----->IN ${controllerName} ${getFile.name}, File Hash : ${req.query.hash}`);

    const result = await fileService.getFileFromIPFS(hash);

    log.info(`----->OUT ${controllerName} ${getFile.name}, (Success) File found`);

    // Document response
    res.writeHead(200, { 'Content-Type': result.type });
    res.end(result.content, 'binary');
  } catch (error) {
    log.error(`----->OUT ${controllerName} ${getFile.name}, (ERROR) : ${error}`);

    res.status(500).send({ message: 'File not found' });
  }
}

async function addFile(req, res) {
  try {
    // Params IN -> New Document
    log.info(`----->IN ${controllerName} ${addFile.name}`);

    const document = req.swagger.params.newDocument.raw.buffer;

    const result = await fileService.addFile(document);

    log.info(`----->OUT ${controllerName} ${addFile.name}, (Success) File inserted, Hash file -> ${result[0].hash}`);

    // Return the hash of the new document inserted in IPFS
    res.status(200).send({ Success: result[0].hash });
  } catch (error) {
    log.error(`----->OUT ${controllerName} ${addFile.name}, ${error}`);
    res.status(500).send({ message: 'Failed inserting document' });
  }
}

module.exports = {
  getFile,
  addFile,
};
