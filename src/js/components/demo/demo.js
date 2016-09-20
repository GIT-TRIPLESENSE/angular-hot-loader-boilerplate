var req = require.context("./", false, /.scss$/)
const styles = require(`${req.keys()[0]}`)
var req = require.context("./", false, /.html$/)
const template = require(`${req.keys()[0]}`)

export default class DemoController {
	
	constructor(Tag) {

		'ngInject';

		this.styles = styles
		this.tags = Tag.data
	
	}	

}

export const component = {
	template,
	controller: DemoController,
	controllerAs: 'ctrl'
}