import axios from 'axios';
import qs from 'qs'
var _axios=axios.create();
_axios.defaults.baseUrl="localhost:3000";
export function post(url,params){
    return new Promise((resolve,reject)=>{
        _axios.post(
            url,
            qs.stringify(params)
        ).then(function(res){
            resolve(res)
        }).catch(function(error){
            reject(error)
        })
    })
    
}
export function get(url,params){
    return new Promise((resolve,reject)=>{
        _axios.get(url,{params}).then(function(res){
            resolve(res)
        }).catch(function(error){
            reject(error)
        })
    })
}