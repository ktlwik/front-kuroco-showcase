import createTextSchema from '../form_types/text_100.js'
import createDateSchema from '../form_types/date.js'
import createUploadFileSchema from '../form_types/file_upload.js'
import createJsonSchema from '../form_types/json.js'

const KurocoParser = {}

KurocoParser.install = function (Vue, options) {
    Vue.prototype.$parse = (json, key) => {
    	if (json.hasOwnProperty('type')) {
  			var result = {}
    		var type_id = json['type']
    		if (type_id == "1") {
				result = createTextSchema(json, key)
			}
			if (type_id == "6") {
				result = createDateSchema(json, key);
			}
			if (type_id == "7") {
				result = createUploadFileSchema(json, key);
			}
			if (type_id == "8") {
				result = createJsonSchema(json, key);
			}
			return result
    	}
    }
}

export default KurocoParser;