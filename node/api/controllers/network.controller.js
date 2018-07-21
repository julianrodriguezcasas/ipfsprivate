// network.controller.js

const Log = require('log');
const networkService = require('../services/network.service');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const controllerName = '[Network controller]';
const log = new Log('debug');

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getNetworkConfig(req, res) {
  try {
    log.info(`----->IN ${controllerName} ${getNetworkConfig.name}`);

    const result = await networkService.getNetworkConfig();

    log.info(`----->OUT ${controllerName} ${getNetworkConfig.name} -> ${JSON.stringify(result)}`);

    res.status(200).send(result);
  } catch (error) {
    log.info(`----->OUT ${controllerName} ${getNetworkConfig.name} (ERROR): ${error}`);
    res.status(500).send(`${error}`);
  }
}

async function setNetworkConfig(req, res) {
  try {
    const { IP } = req.body;

    log.info(`----->IN ${controllerName} ${setNetworkConfig.name}, Parameters -> ${IP}`);

    const result = await networkService.setNetworkConfig(IP);

    log.info(`----->OUT ${controllerName} ${setNetworkConfig.name} -> ${JSON.stringify(result)}`);

    res.status(200).send(result);
  } catch (error) {
    log.info(`----->OUT ${controllerName} ${setNetworkConfig.name} (ERROR): ${error}`);
    res.status(500).send(`${error}`);
  }
}


module.exports = {
  getNetworkConfig,
  setNetworkConfig,
};
