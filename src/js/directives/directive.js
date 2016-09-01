module.exports = function() {
	return {
		replace: true,
		restrict: 'E',
		template: require('./template.html'),
		link: function (scope, element, attrs) {
		
			scope.title = 'Webpack Angular App'
		
		}
	}
}