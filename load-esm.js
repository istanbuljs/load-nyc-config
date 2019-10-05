'use strict';

module.exports = async filename => {
	const mod = await import(filename);
	if ('default' in mod === false) {
		throw new Error(`${filename} has no default export`);
	}

	return mod.default;
};
