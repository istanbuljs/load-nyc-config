'use strict';

const {hasESM} = require('./test/helpers');

const include = [
	'index.js'
];

if (hasESM) {
	include.push('load-esm.js');
}

module.exports = {include};
