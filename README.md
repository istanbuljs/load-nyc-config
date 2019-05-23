# @istanbuljs/load-nyc-config

The utility function which NYC uses to load configuration.
This can be used by outside programs to calculate the configuration.
Command-line arguments are not considered by this function.

```js
const {loadNycConfig} = require('@istanbuljs/load-nyc-config');

console.log(loadNycConfig());
```

## loadNycConfig([options])

### options.cwd

Type: `string`
Default: `cwd` from parent nyc process or `process.cwd()`

### options.nycrc

Type: `string`
Default: `undefined`

Name of the file containing nyc configuration.
This can be a relative or absolute path.
Relative paths can exist at `options.cwd` or any parent directory.
If an nycrc is specified but cannot be found an exception is thrown.

If no nycrc option is provided the default priority of config files are:

* .nycrc
* .nycrc.json
* .nycrc.yml
* .nycrc.yaml
* nyc.config.js

## Configuration merging

Configuration is first loaded from `package.json` if found, this serves as the package
defaults.  These options can be overridden by an nycrc if found.  Arrays are not merged,
so if `package.json` sets `"require": ["@babel/register"]` and `.nycrc` sets `"require": ["esm"]`
the effective require setting will only include `"esm"`.
