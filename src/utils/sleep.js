

export default function(s){
    // 封装
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve()     
        }, s*1000);
    })
}