import angular from 'angular'
import HomeController from './controller'

let controllers = angular.module('app.controllers', [])
	.controller('HomeController', HomeController)

export default controllers.name