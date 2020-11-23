// plugins/axios_ssr.js
export default function ({$axios}) {
    $axios.onRequest(config => {
        if (config.url == '/rcms-api/1/profile'){
            return Promise.reject(config)
        }
    })
    $axios.onError(error => {
        if (error.request.path == '/rcms-api/1/profile'){
            console.log('profile:'+error.request.path)
            return Promise.reject(error.response)
        }
        return Promise.reject('axios.onError path:'+error.request.path+' status:'+error.response.status+' statusText:'+error.response.statusText);
    });
}