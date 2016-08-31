import angular from 'angular'

let controllers = angular.module('app.controllers', [])
	.controller('HomeController', require('./controller'))

export default controllers.name