const t = require('tap');
const {fixturePath, basicTest} = require('./helpers');
const {loadNycConfig} = require('..');

t.test('options.nycrcPath points to non-existent file', t => {
	const cwd = fixturePath();
	const nycrcPath = fixturePath('does-not-exist.json');
	t.throws(() => loadNycConfig({cwd, nycrcPath}));
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
t.test('extends', basicTest);
t.test('extends-array-empty', basicTest);
t.test('extends-array', basicTest);

t.test('extends failures', t => {
	const errorConfigs = ['looper1.json', 'invalid.json', 'missing.json'];
	const cwd = fixturePath('extends');
	errorConfigs.map(f => fixturePath('extends', f)).forEach(nycrcPath => {
		t.throws(() => loadNycConfig({cwd, nycrcPath}));
	});
	t.end();
});

t.test('no package.json', t => {
	const cwd = '/';
	const nycrcPath = fixturePath('nycrc-no-ext', '.nycrc');

	t.matchSnapshot(loadNycConfig({cwd}), 'no config');
	t.matchSnapshot(loadNycConfig({cwd, nycrcPath}), 'explicit .nycrc');
	t.end();
});
