import {request} from '~@/utils/request'
export function test(){
    return request({
        method:'post',
        url:'/test'
    })
}
export function chat(){
    return request({
        method:'post',
        url:'/chat'
    })
}
export function login(username){
    return request({
        method:'post',
        url:'/login',
        data:{
            username
        }
    })
}