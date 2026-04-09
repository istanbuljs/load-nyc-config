import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fixturePath, sanitizeConfig} from './helpers/index.js';
import expected from './expected/env-nyc-cwd.js';
import {loadNycConfig} from '../index.js';

test('env-nyc-cwd', async () => {
	const saved = process.env.NYC_CWD;
	try {
		process.env.NYC_CWD = fixturePath('no-config-file');

		assert.deepStrictEqual(
			sanitizeConfig(await loadNycConfig()),
			expected
		);
	} finally {
		process.env.NYC_CWD = saved;
	}
});
