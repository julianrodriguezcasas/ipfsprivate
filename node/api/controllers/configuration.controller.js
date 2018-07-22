// configuration.controller.js

const Log = require('log');
const configService = require('../services/configuration.service');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const controllerName = '[Configuration controller]';
const log = new Log('debug');

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getConfiguration(req, res) {
  try {
    log.info(`----->IN ${controllerName} ${getConfiguration.name}`);

    const result = await configService.getConfiguration();

    log.info(`----->OUT ${controllerName} ${getConfiguration.name}, (Success)`);

    res.status(200).send(JSON.parse(result));
  } catch (error) {
    log.info(`----->OUT ${controllerName} ${getConfiguration.name} (ERROR): ${error}`);
    res.status(500).send(`${error}`);
  }
}


module.exports = {
  getConfiguration,
};
