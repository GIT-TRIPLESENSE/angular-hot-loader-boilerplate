require("./icons.font");
require('./scss/main.scss')

import angular from 'angular';
import directives from './js/directives'
import services from './js/services'
import controllers from './js/controllers'

let ngModule = angular.module('app', [
	directives,
	controllers,
	services
])