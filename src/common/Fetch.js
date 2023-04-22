import Util from "./Util";

const host = 'http://95.85.126.113:3116/api/';
// const host = 'https://api.arzan.info/api/';
// const host = 'http://10.15.0.33:3110/api/';

const headers = {
    'User-Agent': 'Adybelli/WEB/1.0.0',
    'Referrer': host.replace("/api/", ""),
    'Accept': 'application/json',
    'Device': 'Web',
    "Region": Util.getItem("region")||1,
    "UUID":`w_${Util.getItem('uuid')}`,
    }

function _fetch(uri, opts = {}){
    return new Promise(function(resolve, reject){
        const origin = new URL(host+uri);
        for (let [key, value] of Object.entries(opts.qs || {})){
            origin.searchParams.append(key, value);
        }

        opts.headers = {...headers, ...opts.headers};
        const token = Util.getCookie("token");
        if (token){
            opts.headers['Authorization'] = 'Bearer ' + token;
        }

        if (opts.method === 'PUT' || opts.method === 'POST' || opts.method === 'DELETE' || opts.method === 'PATCH'){
            if (!opts.form) opts.body = JSON.stringify(opts.body);
        }
        fetch(origin, opts)
            .then(res => res.json())
            .then(resolve)
            .catch(reject);
    })
}

export default _fetch;