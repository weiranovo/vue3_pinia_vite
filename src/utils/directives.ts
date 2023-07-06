export default {
    install(app:any){
        app.directive('inputFox',inputFox)
    }
}


//input自动聚焦
const inputFox = {
    mounted(el:any){
         el.querySelector('input').focus()
    }
}