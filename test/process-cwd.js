const t = require('tap');
const {fixturePath, sanitizeConfig} = require('./helpers');
const {loadNycConfig} = require('..');

t.test('process-cwd', async t => {
	const saved = process.env.NYC_CWD;
	delete process.env.NYC_CWD;

	process.chdir(fixturePath('no-config-file'));

	t.matchSnapshot(sanitizeConfig(await loadNycConfig()));

	process.env.NYC_CWD = saved;
});
