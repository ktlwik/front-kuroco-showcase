
export default function createDateSchema(json, key) {
	var result = {}
	if (json.hasOwnProperty('type') && json['type'] == '6') {
	    var type_id = json['type']
	    result['model'] = key
	    result['type'] = 'vuetifyDate'
	 }

	console.log(result)
	return result
};

