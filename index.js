'use strict';

const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');
const findUp = require('find-up');

const standardConfigFiles = [
	'.nycrc',
	'.nycrc.json',
	'.nycrc.yml',
	'.nycrc.yaml',
	'nyc.config.js'
];

function camelcasedConfig(config) {
	const results = {};
	for (const [field, value] of Object.entries(config)) {
		results[camelcase(field)] = value;
	}

	return results;
}

function findPackage(options) {
	const cwd = options.cwd || process.env.NYC_CWD || process.cwd();
	const pkgPath = findUp.sync('package.json', {cwd});
	if (pkgPath) {
		return {
			cwd: path.dirname(pkgPath),
			pkgConfig: JSON.parse(fs.readFileSync(pkgPath, 'utf8')).nyc || {}
		};
	}

	return {
		cwd,
		pkgConfig: {}
	};
}

function actualLoad(configFile) {
	if (!configFile) {
		return {};
	}

	const configExt = path.extname(configFile).toLowerCase();
	switch (configExt) {
		case '.js':
			return require(configFile);
		case '.yml':
		case '.yaml':
			return require('js-yaml').load(
				fs.readFileSync(configFile, 'utf8')
			);
		default:
			return JSON.parse(
				fs.readFileSync(configFile, 'utf8')
			);
	}
}

function loadNycConfig(options = {}) {
	const {cwd, pkgConfig} = findPackage(options);
	const configFiles = [].concat(options.nycrc || standardConfigFiles);
	const configFile = findUp.sync(configFiles, {cwd});
	if (options.nycrc && !configFile) {
		throw new Error(`Requested configuration file ${options.nycrc} not found`);
	}

	const config = {
		...camelcasedConfig(pkgConfig),
		...camelcasedConfig(actualLoad(configFile))
	};

	const arrayFields = ['require', 'extension', 'exclude', 'include'];
	for (const arrayField of arrayFields) {
		if (config[arrayField]) {
			config[arrayField] = [].concat(config[arrayField]);
		}
	}

	return config;
}

module.exports = {
	loadNycConfig
};
