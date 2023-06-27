import SvgIcon from "@/components/SvgIcon/index.vue";
import haha from "@/components/datai/index.vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allComponents: any = { SvgIcon, haha }

export default {
    install(app: any) {
        Object.keys(allComponents).forEach((key) => {
            app.component(key, allComponents[key])
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}