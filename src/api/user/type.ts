//登陆接口需要携带的参数ts类型
export interface loginFormData{
    username:string,
    password:string | number
}



//定义全部接口返回的类型
export interface responseData<T> {
    code:number,
    message:string,
    ok:boolean,
    data:T
}

//定义登陆返回的数据类型
export interface userInforesponseData {
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string
    }
}

interface user{
    checkUser:any
}


//定义服务器返回的用户信息相关数据类型。
export interface userResponseData{
    code:number,
    data:user
}