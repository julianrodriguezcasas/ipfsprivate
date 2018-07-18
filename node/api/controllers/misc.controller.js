// misc.controller.js

const Log = require('log');
const miscService = require('../services/misc.service');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const controllerName = '[Misc controller]';
const log = new Log('debug');

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function healthcheck(req, res) {
  try {
    log.info(`----->IN ${controllerName} ${healthcheck.name}`);
    const result = await miscService.healthcheck();
    log.info(`----->OUT ${controllerName} ${healthcheck.name} -> ${JSON.stringify(result)}`);
    res.status(200).send({ message: 'IPFS node is connected and running' });
  } catch (error) {
    log.info(`----->OUT ${controllerName} ${healthcheck.name} (ERROR): ${error}`);
    res.status(500).send({ message: 'IPFS node is not connected' });
  }
}


module.exports = {
  healthcheck,
};
