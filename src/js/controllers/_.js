import path from 'path'
import string from 'string'

const controllers = angular.module(`${AngularNS}.controllers`, [])
const req = require.context("./", true, /^((?!_.js).)*.js$/)

req.keys().forEach((key) => {
	let basename = path.basename(key,'.js')
	let name = string(basename).camelize().titleCase().s;
	let controller = require(`${key}`).default
	controllers.controller(name, controller)
});

export default controllers.name