'use strict';

const path = require('path');
const pkg = require('../package.json')
const string = require('string')

module.exports = function (input) {
	
	this.cacheable();
	
	const fileName = path.basename(this.resourcePath, '.js');
	const classToInject = string(fileName).capitalize().camelize().s
	
	return input + `
		if (module.hot) {
			module.hot.accept(console.log.bind(console));
			// get service instance
			const name = ${classToInject}.name;
			const doc = angular.element(document.body.querySelector('${pkg.name.toLowerCase()}'));
			const injector = doc.injector();

			if (injector) {
				const origin = injector.get(name);
				const target = ${classToInject}.prototype;
				const enumAndNonenum = Object.getOwnPropertyNames(target);
				const enumOnly = Object.keys(target);
				// not found in enumOnly keys mean the key is non-enumerable,
				// so return true so we keep this in the filter if it's not the constructor
				const nonenumOnly = enumAndNonenum.filter(key => enumOnly.indexOf(key) === -1 && key !== 'constructor');
				nonenumOnly.forEach(val => origin.__proto__[val] = target[val]);

				// trigger rootscope update
				doc.scope().$apply();
				console.info('Hot Swapped ' + name);
			}
		}
	`;
};