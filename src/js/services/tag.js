export default class Tag {

	constructor() {
		
		this._data = [
			"Webpack",
			"Angular",
			"React"
		]

	}

	get data() {
		
		return this._data

	}

	set data(data) {

		this._data  = data
	
	}

}