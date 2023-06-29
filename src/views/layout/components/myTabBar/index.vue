<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon style="margin-right:10px" @click="changeType">
                <component :is="modelValue?'Expand':'Fold'"></component>
            </el-icon>
            <myBread></myBread>
        </div>
        <div class="tabbar_right">
            <el-button size="small" icon="refresh" @click="refresh" circle></el-button>
            <el-button size="small" icon="FullScreen" @click="fullScreen" circle></el-button>
            <el-button size="small" icon="setting" circle></el-button>
            <img :src="store.state.user.avatar" style="width: 30px;height:30px;margin:0 10px;border-radius: 50%;" alt="">
            <el-dropdown>
                <span>
                    {{ store.state.user.username }}
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import myBread from '@/components/bread/bread.vue'
import { reqLogout } from '@/api/user'
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()
const store = useStore()
const prop = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
//切换收缩状态
const changeType = () => {
    emit('update:modelValue', !prop.modelValue)
}

//刷新按钮
const refresh = () => {
    store.commit('layout/setRefresh')
}

//全屏
const fullScreen = () => {
    let full = document.fullscreenElement

    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
//退出登录
const loginOut = async () => {
    const result = await reqLogout()
    if (result.ok) {
        store.commit('user/removeUserInfo')
        //@ts-ignore
        ElNotification({
            type: 'success',
            message: result.message
        })
        router.push({ path: '/login', query: { redirect: route.path } })
    }
}
</script>

<style scoped lang="scss">
.tabbar {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
}

.tabbar_left,
.tabbar_right {
    display: flex;
    align-items: center;
}
</style>