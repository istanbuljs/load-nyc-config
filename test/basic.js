const path = require('path');
const t = require('tap');
const {fixturePath, sanitizeConfig, basicTest, hasESM} = require('./helpers');
const {loadNycConfig} = require('..');

t.test('options.nycrcPath points to non-existent file', async t => {
	const cwd = fixturePath();
	const nycrcPath = fixturePath('does-not-exist.json');
	await t.rejects(loadNycConfig({cwd, nycrcPath}));
});

t.test('no-config-file', basicTest);
t.test('nycrc-no-ext', basicTest);
t.test('nycrc-json', basicTest);
t.test('nycrc-yml', basicTest);
t.test('nycrc-yaml', basicTest);
t.test('nyc-config-cjs', basicTest);
t.test('nyc-config-js', basicTest);
t.test('nyc-config-async', basicTest);
t.test('array-field-fixup', basicTest);
t.test('camel-decamel', basicTest);
t.test('extends', basicTest);
t.test('extends-cwd', basicTest);
t.test('extends-array-empty', basicTest);
t.test('extends-array', basicTest);
t.test('package-lock-cwd', basicTest);

t.test('extends failures', async t => {
	const cwd = fixturePath('extends');
	const files = {
		'looper1.json': /Circular extended configurations/,
		'invalid.json': /contains an invalid 'extends' option/,
		'invalid.js': /Unexpected identifier/,
		'invalid.cjs': /Unexpected identifier/,
		'missing.json': /Could not resolve configuration file/
	};
	if (hasESM) {
		files['invalid.mjs'] = /has no default export/;
	}

	const tests = Object.entries(files).map(([file, error]) => {
		return t.rejects(loadNycConfig({
			cwd,
			nycrcPath: fixturePath('extends', file)
		}), error, file);
	});

	await Promise.all(tests);
});

t.test('no package.json', async t => {
	const cwd = path.resolve('/');
	const nycrcPath = fixturePath('nycrc-no-ext', '.nycrc');

	t.matchSnapshot(sanitizeConfig(await loadNycConfig({cwd})), 'no config');
	t.matchSnapshot(sanitizeConfig(await loadNycConfig({cwd, nycrcPath})), 'explicit .nycrc');
});

t.test('found package.json cwd from subdir', async t => {
	const cwd = fixturePath('nycrc-json', 'subdir');
	t.matchSnapshot(sanitizeConfig(await loadNycConfig({cwd})));
});

if (hasESM) {
	t.test('nyc-config-mjs', basicTest);
	t.test('nyc-config-js-type-module', basicTest);
}
