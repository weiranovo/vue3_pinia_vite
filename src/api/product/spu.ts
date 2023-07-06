import request from "@/utils/request";
enum Api {
    GETSKULIST_URL = '/admin/product/',
    GETBASETRADER_URL = '/admin/product/baseTrademark/getTrademarkList',
    GETSPUIMAGE_URL = '/admin/product/spuImageList/',
    GETSPUATTRLIST_URL = '/admin/product/spuSaleAttrList/' ,
    ALLSALLATTR_URL = '/admin/product/baseSaleAttrList',
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    UPDATESPU_URL = '/admin/product/updateSpuInfo',
    ADDSKU_URL = '/admin/product/saveSkuInfo',
    FINDSKU_URL = '/admin/product/findBySpuId/',
    DELSPU_URL = '/admin/product/deleteSku/',
}
export const getSkuList = (page:any,limit:any,params:any) => {
    // return request.get<any, any>(`${Api.GETSKULIST_URL}${page}/${limit}`,params)
    return request({
        method:'get',
        url:`${Api.GETSKULIST_URL}${page}/${limit}`,
        params
    })
}

export const getTrademarkList = ()=>{
    return request.get(Api.GETBASETRADER_URL)
}

export const getSpuImgList = (spuid:number)=>{
    return request.get(Api.GETSPUIMAGE_URL+spuid)
}

export const getSpuSaleAttrList = (spuid:number)=>{
    return request.get(Api.GETSPUATTRLIST_URL+spuid)
}

export const getAllSallAttr = ()=>{
    return request.get(Api.ALLSALLATTR_URL)
}

export const addOrUpdateSpuInfo = (data:any)=>{
    if(data.id){
        return request.post(Api.UPDATESPU_URL,data)
    }else{
        return request.post(Api.ADDSPU_URL,data)
    } 
}

export const reqAddSku = (data:any)=>{
    return request.post(Api.ADDSKU_URL,data)
}

export const findSku = (spuid:number)=>{
    return request.get(Api.FINDSKU_URL+spuid)
}

export const delSPU = (spuid:number)=>{
    return request.delete(Api.DELSPU_URL+spuid)
}

