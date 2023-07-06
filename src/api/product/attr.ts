import request from "@/utils/request";
enum Api {
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTRINFO_URL = '/admin/product/attrInfoList/',
    ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
    DELETEATTR_URL = '/admin/product/deleteAttr/'

}
export const getCategory1 = () => {
    return request.get<any, any>(Api.C1_URL)
}

export const getCategory2 = (c1:any) => {
    return request.get<any, any>(Api.C2_URL+c1)
}

export const getCategory3 = (c2:any) => {
    return request.get<any, any>(Api.C3_URL+c2)
}

export const getAttrInfo = (data:any)=>{
    return request.get(`${Api.ATTRINFO_URL}${data.c1}/${data.c2}/${data.c3}`)
}

export const addOrUpdateAttr = (data:any)=>{
    return request.post(Api.ADDORUPDATEATTR_URL,data)
}


export const DelAttr = (attrId:number)=>{
    return request.delete(`${Api.DELETEATTR_URL}${attrId}`)
}

