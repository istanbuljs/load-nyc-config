import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function fixturePath(...args) {
	return path.resolve(__dirname, '..', 'fixtures', ...args);
}

export function sanitizeConfig(config) {
	if (config.cwd === path.resolve('/')) {
		config.cwd = 'root:;';
	} else {
		const relativeCWD = path.relative(path.resolve(__dirname, '..', '..'), config.cwd);
		config.cwd = 'package-root:;' + relativeCWD.replace(/\\/g, path.posix.sep);
	}

	return config;
}
