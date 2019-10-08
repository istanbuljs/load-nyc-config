const t = require('tap');
const {fixturePath, sanitizeConfig} = require('./helpers');
const {loadNycConfig} = require('..');

t.test('env-nyc-cwd', async t => {
	const saved = process.env.NYC_CWD;
	process.env.NYC_CWD = fixturePath('no-config-file');

	t.matchSnapshot(sanitizeConfig(await loadNycConfig()));

	process.env.NYC_CWD = saved;
});
