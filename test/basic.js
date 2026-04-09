import path from 'path';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fixturePath, sanitizeConfig} from './helpers/index.js';
import expected from './expected/basic.js';
import {loadNycConfig} from '../index.js';

async function basicTest(t) {
	const cwd = fixturePath(t.name);
	const config = await loadNycConfig({cwd});

	const expectedValue = expected.byTestName[t.name];
	assert.ok(expectedValue, `Missing expected value for test name: ${t.name}`);
	assert.deepStrictEqual(sanitizeConfig(config), expectedValue);
}

test('options.nycrcPath points to non-existent file', async () => {
	const cwd = fixturePath();
	const nycrcPath = fixturePath('does-not-exist.json');
	await assert.rejects(loadNycConfig({cwd, nycrcPath}));
});

test('no-config-file', basicTest);
test('nycrc-no-ext', basicTest);
test('nycrc-json', basicTest);
test('nycrc-yml', basicTest);
test('nycrc-yaml', basicTest);
test('nyc-config-cjs', basicTest);
test('nyc-config-js', basicTest);
test('nyc-config-async', basicTest);
test('array-field-fixup', basicTest);
test('camel-decamel', basicTest);
test('extends', basicTest);
test('extends-cwd', basicTest);
test('extends-array-empty', basicTest);
test('extends-array', basicTest);
test('package-lock-cwd', basicTest);

test('extends failures', async () => {
	const cwd = fixturePath('extends');
	const files = {
		'looper1.json': /Circular extended configurations/,
		'invalid.json': /contains an invalid 'extends' option/,
		'invalid.js': /Unexpected identifier/,
		'invalid.cjs': /Unexpected identifier/,
		'missing.json': /Could not resolve configuration file/,
		'invalid.mjs': /has no default export/
	};

	const tests = Object.entries(files).map(([file, error]) => {
		return assert.rejects(loadNycConfig({
			cwd,
			nycrcPath: fixturePath('extends', file)
		}), error, file);
	});

	await Promise.all(tests);
});

test('no package.json', async () => {
	const cwd = path.resolve('/');
	const nycrcPath = fixturePath('nycrc-no-ext', '.nycrc');

	assert.deepStrictEqual(
		sanitizeConfig(await loadNycConfig({cwd})),
		expected.noPackageJson.noConfig
	);
	assert.deepStrictEqual(
		sanitizeConfig(await loadNycConfig({cwd, nycrcPath})),
		expected.noPackageJson.explicitNycrc
	);
});

test('found package.json cwd from subdir', async () => {
	const cwd = fixturePath('nycrc-json', 'subdir');
	assert.deepStrictEqual(
		sanitizeConfig(await loadNycConfig({cwd})),
		expected.foundPackageJsonCwdFromSubdir
	);
});

test('nyc-config-mjs', basicTest);
test('nyc-config-js-type-module', basicTest);
