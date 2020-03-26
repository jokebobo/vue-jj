// 导出一个工厂函数 用于创建新的vue实例
const Vue=require(Vue);
import client from '../views/client/client';
export function createRender(){
    return new Vue({
        render:h=>h(client)
    })
}