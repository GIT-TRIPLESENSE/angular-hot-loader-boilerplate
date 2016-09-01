import angular from 'angular'

let services = angular.module('app.services', [])
	.service('names', require('./service'))

export default services.name