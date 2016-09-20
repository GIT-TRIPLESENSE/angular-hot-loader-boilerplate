require("../icons/index.font")
require('../scss/main.scss')

import angular from 'angular'

import controllers from './controllers/_'
import services from './services/_'
import components from './components/_'

let ngModule = angular.module(AngularNS, [
	components,
	controllers,
	services
])

angular.bootstrap(document.body, [AngularNS])