import request from "@/utils/request";

export const getTableData = (config:any)=>{
    console.log(config)
    return request({
        method:'get',
        url:`${config.url}${config.page}/${config.limit}`
    })
}