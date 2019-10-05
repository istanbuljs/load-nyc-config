'use strict';

const {promisify} = require('util');

const delay = promisify(setTimeout);

async function loadConfig() {
	await delay(10);
	return {all: false};
}

module.exports = loadConfig();
