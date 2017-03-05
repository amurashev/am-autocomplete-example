"use strict";

const path = require('path');
const argv = require('yargs').argv;

const webpackCB = require('./webpackCB');
const webpackConfig = require('./webpackConfig');
//const htmlBuild = require('./htmlBuild');







const buildApp = () => {
	
	const isWatch = argv.mode == 'dev';
	webpackCB(webpackConfig(argv.mode, {}), isWatch);
};


buildApp();
