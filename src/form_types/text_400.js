
export default function createTextSchema(json, key) {
	var result = {}
	if (json.hasOwnProperty('type') && json['type'] == '1') {
	    var type_id = json['type']
	    result['model'] = key
	    result['type'] = 'vuetifyText'
	    result['inputType'] = 'text'
	    result['label'] = json['title']

	    if (json['attribute']['max_length'] != '') {
	    	result['counter'] = json['attribute']['max_length']
	    	result['max'] = parseInt(json['attribute']['max_length'])
	    } else {
	    	result['counter'] = 400
	    	result['max'] = 400
	    }

	    if (json['attribute']['min_length'] != '') {
	    	result['min'] = parseInt(json['attribute']['min_length'])
	    	result['min'] = 0
	    } 
	}

	console.log(result)
	return result
};

