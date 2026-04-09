import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fixturePath, sanitizeConfig} from './helpers/index.js';
import expected from './expected/process-cwd.js';
import {loadNycConfig} from '../index.js';

test('process-cwd', async () => {
	const saved = process.env.NYC_CWD;
	const savedCwd = process.cwd();
	try {
		delete process.env.NYC_CWD;

		process.chdir(fixturePath('no-config-file'));

		assert.deepStrictEqual(
			sanitizeConfig(await loadNycConfig()),
			expected
		);
	} finally {
		process.env.NYC_CWD = saved;
		process.chdir(savedCwd);
	}
});
