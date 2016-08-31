import angular from 'angular'

let directives = angular.module('app.directive', [])
	.directive('directive', require('./directive'))

export default directives.name