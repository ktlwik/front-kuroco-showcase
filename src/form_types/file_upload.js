
export default function createUploadFileSchema(json, key) {
	var result = {}
	if (json.hasOwnProperty('type') && json['type'] == '7') {
	    var type_id = json['type']
	    result['model'] = key
	    result['type'] = 'uploadFile'
	 }

	console.log(result)
	return result
};

