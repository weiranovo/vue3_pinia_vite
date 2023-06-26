//登陆接口需要携带的参数ts类型
export interface loginForm{
    username:string,
    password:string | number
}

interface dataType{
    token?:string,
    message?:string
}

//登陆接口返回数据类型
export interface loginResponseData{
    code:number
    data:dataType
}

interface user{
    checkUser:any
}


//定义服务器返回的用户信息相关数据类型。
export interface userResponseData{
    code:number,
    data:user
}