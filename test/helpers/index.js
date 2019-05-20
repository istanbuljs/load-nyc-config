const path = require('path');
const nycLoadConfig = require('../..');

function fixturePath(...args) {
	return path.join(__dirname, '..', 'fixtures', ...args);
}

function basicTest(t) {
	const cwd = fixturePath(t.name);

	t.matchSnapshot(nycLoadConfig({cwd}));
	t.end();
}

module.exports = {
	fixturePath,
	basicTest
};
