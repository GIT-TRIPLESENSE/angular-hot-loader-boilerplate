require("../icons/index.font")
require('../scss/main.scss')

import angular from 'angular'
import directives from './directives'
import services from './services'
import controllers from './controllers'

let ngModule = angular.module('app', [
	directives,
	controllers,
	services
])