'use strict';

const path = require('path');
const pkg = require('../package.json')
const string = require('string')

module.exports = function (input) {
	
	this.cacheable();
	
	const fileName = path.basename(this.resourcePath, '.js');
	const tagName = fileName;
	const controllerName = `${string(fileName).camelize().capitalize().s}Controller`;
	const directiveName = string(fileName).camelize().s;

	return input + `
		if (module.hot) {
			module.hot.accept();
			const name = ${controllerName}.name;
			const doc = angular.element(document.body.querySelector('${pkg.name.toLowerCase()}'));
			const injector = doc.injector();
			if (injector) {
				const directive = injector.get('${directiveName}Directive')[0];
				if (directive) {
					const origin = directive.controller;
					const target = ${controllerName}.prototype;
					const enumAndNonenum = Object.getOwnPropertyNames(target);
					const enumOnly = Object.keys(target);
					const nonenumOnly = enumAndNonenum.filter(key => enumOnly.indexOf(key) === -1 && key !== 'constructor');
					nonenumOnly.forEach(val => origin.prototype[val] = target[val]);
					doc.scope().$apply();
					console.info('Hot Swapped ' + name);
				}
			}
		}
	`;
};
