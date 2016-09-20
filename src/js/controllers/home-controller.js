export default class HomeController {
	
	constructor (
		$scope,
		Tag
	) {
		
		'ngInject';
		$scope.Tag = Tag.data

	}
}