const t = require('tap');
const {fixturePath} = require('./helpers');
const {loadNycConfig} = require('..');

const saved = process.env.NYC_CWD;
delete process.env.NYC_CWD;

process.chdir(fixturePath('no-config-file'));

t.matchSnapshot(loadNycConfig());
t.end();

process.env.NYC_CWD = saved;
