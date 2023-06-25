import  SvgIcon  from "@/components/SvgIcon/index.vue";
import  haha  from "@/components/datai/index.vue";
const allComponents:any = { SvgIcon,haha }

export default {
    install(app:any){
        Object.keys(allComponents).forEach((key)=>{
           
            app.component(key,allComponents[key])
        })
         
    }
}