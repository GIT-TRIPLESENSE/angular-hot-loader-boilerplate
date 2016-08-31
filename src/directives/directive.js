module.exports = function() {
	return {
		restrict: 'E',
		template: '<p>{{title}}</p>',
		link: function (scope, element, attrs) {

			scope.title = 'Webpack Angular App'

		}
	}
}