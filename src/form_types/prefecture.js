
export default function createPrefectureSchema(json, key) {
	var result = {}
	if (json.hasOwnProperty('type') && json['type'] == '9') {
	    var type_id = json['type']
	    result['model'] = key
	    result['type'] = 'vuetifyPrefecture'
	    result['label'] = json['title']
	    result['options'] = Object.values(json['options'])
 		console.log(Object.values(json['options']))
 	}

	console.log(result)
	return result
};

