'use strict';

const {hasImport} = require('./test/helpers');

const include = [
	'index.js'
];

if (hasImport) {
	include.push('load-esm.js');
}

module.exports = {include};
