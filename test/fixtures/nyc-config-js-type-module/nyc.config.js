import loadNycConfig from '../../../index.js';

const {isLoading} = loadNycConfig;

export default {
	all: !isLoading()
};
