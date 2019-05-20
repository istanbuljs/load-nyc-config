const t = require('tap');
const {fixturePath} = require('./helpers');
const nycLoadConfig = require('..');

const saved = process.env.NYC_CWD;
delete process.env.NYC_CWD;

process.chdir(fixturePath('no-config-file'));

t.matchSnapshot(nycLoadConfig());
t.end();

process.env.NYC_CWD = saved;
