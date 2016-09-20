import path from 'path'
import string from 'string'

const components = angular.module(`${AngularNS}.components`, [])
const req = require.context("./", true, /^((?!_.js).)*.js$/)

req.keys().forEach((key) => {
	let basename = path.basename(key,'.js')
	let name = string(basename).camelize().s;
	let component = require(`${key}`).component
	components.component(name, component)
});

export default components.name