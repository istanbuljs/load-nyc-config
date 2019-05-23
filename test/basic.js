const t = require('tap');
const {fixturePath, basicTest} = require('./helpers');
const {loadNycConfig} = require('..');

t.test('options.nycrc points to non-existent file', t => {
	const cwd = fixturePath();
	const nycrc = fixturePath('does-not-exist.json');
	t.throws(() => loadNycConfig({cwd, nycrc}));
	t.end();
});

t.test('no-config-file', basicTest);
t.test('nycrc-no-ext', basicTest);
t.test('nycrc-json', basicTest);
t.test('nycrc-yml', basicTest);
t.test('nycrc-yaml', basicTest);
t.test('nyc-config-js', basicTest);
t.test('array-field-fixup', basicTest);
t.test('camel-decamel', basicTest);

t.test('no package.json', t => {
	const cwd = '/';
	const nycrc = fixturePath('nycrc-no-ext', '.nycrc');

	t.matchSnapshot(loadNycConfig({cwd}), 'no config');
	t.matchSnapshot(loadNycConfig({cwd, nycrc}), 'explicit .nycrc');
	t.end();
});
