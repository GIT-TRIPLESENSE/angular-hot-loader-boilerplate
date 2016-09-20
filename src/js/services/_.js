import path from 'path'
import string from 'string'

const services = angular.module(`${AngularNS}.services`, [])
const req = require.context("./", true, /^((?!_.js).)*.js$/)
	
req.keys().forEach((key) => {
	let basename = path.basename(key,'.js')
	let name = string(basename).titleCase().s;
	let service = require(`${key}`).default
	services.service(name, service)
});

export default services.name