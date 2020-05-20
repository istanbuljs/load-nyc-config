'use strict';

const {isLoading} = require('../../../index.js');

module.exports = {all: !isLoading()};
