const t = require('tap');
const {fixturePath} = require('./helpers');
const {loadNycConfig} = require('..');

t.test('process-cwd', async t => {
	const saved = process.env.NYC_CWD;
	delete process.env.NYC_CWD;

	process.chdir(fixturePath('no-config-file'));

	t.matchSnapshot(await loadNycConfig());

	process.env.NYC_CWD = saved;
});
