// Expected values derived from the previous tap snapshots in `tap-snapshots/test-basic.js-TAP.test.js`.
export default {
	byTestName: {
		'array-field-fixup': {
			cwd: 'package-root:;test/fixtures/array-field-fixup',
			exclude: ['test.js'],
			extension: ['.js'],
			include: ['index.js'],
			require: ['esm']
		},
		'camel-decamel': {
			cwd: 'package-root:;test/fixtures/camel-decamel',
			excludeAfterRemap: false,
			excludeNodeModules: false,
			skipFull: true
		},
		extends: {
			all: false,
			cwd: 'package-root:;test/fixtures/extends'
		},
		'extends-array': {
			all: false,
			cwd: 'package-root:;test/fixtures/extends-array',
			excludeNodeModules: true
		},
		'extends-array-empty': {
			all: true,
			cwd: 'package-root:;test/fixtures/extends-array-empty'
		},
		'extends-cwd': {
			all: true,
			cwd: 'package-root:;test/fixtures/extends-cwd'
		},
		'no-config-file': {
			all: true,
			cwd: 'package-root:;test/fixtures/no-config-file'
		},
		'nyc-config-async': {
			all: false,
			cwd: 'package-root:;test/fixtures/nyc-config-async'
		},
		'nyc-config-cjs': {
			all: false,
			cwd: 'package-root:;test/fixtures/nyc-config-cjs'
		},
		'nyc-config-js': {
			all: false,
			cwd: 'package-root:;test/fixtures/nyc-config-js'
		},
		'nyc-config-js-type-module': {
			all: false,
			cwd: 'package-root:;test/fixtures/nyc-config-js-type-module'
		},
		'nyc-config-mjs': {
			all: false,
			cwd: 'package-root:;test/fixtures/nyc-config-mjs'
		},
		'nycrc-json': {
			all: false,
			cwd: 'package-root:;test/fixtures/nycrc-json'
		},
		'nycrc-no-ext': {
			all: false,
			cwd: 'package-root:;test/fixtures/nycrc-no-ext'
		},
		'nycrc-yaml': {
			all: false,
			cwd: 'package-root:;test/fixtures/nycrc-yaml'
		},
		'nycrc-yml': {
			all: false,
			cwd: 'package-root:;test/fixtures/nycrc-yml'
		},
		'package-lock-cwd': {
			cwd: 'package-root:;test/fixtures/package-lock-cwd/subdir'
		}
	},

	noPackageJson: {
		noConfig: {
			cwd: 'root:;'
		},
		explicitNycrc: {
			all: false,
			cwd: 'root:;'
		}
	},

	foundPackageJsonCwdFromSubdir: {
		all: false,
		cwd: 'package-root:;test/fixtures/nycrc-json'
	}
};

