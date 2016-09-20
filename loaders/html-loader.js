'use strict';

const path = require('path');
const pkg = require('../package.json')
const string = require('string')

module.exports = function (input) {
	
	this.cacheable();
	
	const fileName = path.basename(this.resourcePath, '.html');
	const tagName = fileName;
	const directiveName = string(tagName).camelize().s;

	return input + `
		if (module.hot) {
			module.hot.accept(console.log.bind(console));
			const newTpl = module.exports;
			const doc = angular.element(document.body.querySelector('${pkg.name.toLowerCase()}'));
			const injector = doc.injector();
			if (injector) {
				const $compile = injector.get('$compile');
				const oldTemplate = injector.get('${directiveName}Directive')[0];
				if (oldTemplate.template !== newTpl) {
					oldTemplate.template = newTpl;
					const elems = Array.prototype.slice.call(doc.find('${tagName}'));
					elems.forEach(elt => {
						const angularElement = angular.element(elt);
						const scope = angularElement.isolateScope();
						angularElement.html(newTpl);
						$compile(angularElement.contents())(scope);
					});
				}

				doc.scope().$apply();
				console.info('Hot Swapped template ' + name);
			}
		}
	`;
};