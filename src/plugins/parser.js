import createTextSchema from '../form_types/text_100.js'

const KurocoParser = {}

KurocoParser.install = function (Vue, options) {
    Vue.prototype.$parse = (json, key) => {
    	if (json.hasOwnProperty('type')) {
  			var result = {}
    		var type_id = json['type']

			result = createTextSchema(json, key)
			return result
    	}
    }
}

export default KurocoParser;