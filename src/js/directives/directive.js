module.exports = function() {
	return {
		replace: true,
		restrict: 'E',
		template: '<p>{{title}}</p>',
		link: function (scope, element, attrs) {

			scope.title = 'Webpack Angular App'

		}
	}
}