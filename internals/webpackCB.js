const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');

module.exports = (config, isWatch) => {

	//console.warn(config);

	if(isWatch) {

		var bundleStart = null;
		var compiler = webpack(config, function(err, stats) {

		});

		compiler.plugin('compile', function() {
			console.log(chalk.bold.green('Watcher begin'));
			bundleStart = Date.now();
		});

		compiler.plugin('done', function() {
			console.log(chalk.bold.green('Bundled in ' + (Date.now() - bundleStart) + 'ms!'));
		});

		compiler.watch({ // watch options:
			//cache: true,
			aggregateTimeout: 300, // wait so long for more changes
			poll: true // use polling instead of native watchers
			// pass a number to set the polling interval
		}, function(err, stats) {
			console.log('[webpack:build]', stats.toString({
				chunks: false, // Makes the build much quieter
				colors: true,
			}));
		});

	} else {
		webpack(config, function(err, stats) {
			if (err) { throw new gutil.PluginError('webpack:build', err); }

			//console.warn('stats', stats.toString());
			console.log('[webpack:build]', stats.toString({
				chunks: false, // Makes the build much quieter
				colors: true,
				children: false
			}));
		});
	}
};
