
export default function createDateSchema(json, key) {
	var result = {}
	if (json.hasOwnProperty('type') && json['type'] == '6') {
	    var type_id = json['type']
	    result['model'] = key
	    result['type'] = 'vuetifyDate'
	    result['time'] = '0';
		if (json.hasOwnProperty('attribute') && json['attribute'].hasOwnProperty('add_time')) {
			if (json['attribute']['add_time'] == '1') {
				result['time'] = '1';
			}
		}
		if (json.hasOwnProperty('attribute') && json['attribute'].hasOwnProperty('minYear')) {
			result['minYear'] = json['attribute']['minYear']
		}
		if (json.hasOwnProperty('attribute') && json['attribute'].hasOwnProperty('maxYear')) {
			result['maxYear'] = json['attribute']['maxYear']
		}
	 }

	console.log(result)
	return result
};

