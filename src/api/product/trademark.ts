import request from "@/utils/request";
import { responseData } from "@/api/user/type";
enum Api {
    TRADEMARK_URL = "/admin/product/baseTrademark/",
    ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
    UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
    DELETETRADEMARK_URL = "/admin/product/baseTrademark/remove/"

}
export const reqHasTrademark = (page: number, limit: number) => {
    return request.get<any, responseData<any>>(Api.TRADEMARK_URL + `${page}/${limit}`)
}

export const reqADDorUpdateTrademark = (data: any) => {
    if (data.id) {
        return request.put<any, any>(Api.UPDATETRADEMARK_URL, data)
    } else {
        return request.post<any, any>(Api.ADDTRADEMARK_URL, data)
    }
}

export const deleteTrademark = (id: number | string) => {
    return request.delete<any, responseData<any>>(Api.DELETETRADEMARK_URL + `${id}`)
}
