<template>
    <div class="logo">
        <img :src="setting.logo" alt="">
        <p v-show="!flag" style="white-space: nowrap;" >{{ setting.title }}</p>
    </div>
    <el-scrollbar class="elscroll">
        <el-menu background-color="#001529" text-color="#fff" :default-active="route.fullPath" :router="true"
            :collapse="flag" :collapse-transition="false">
            <asideMenu :menuList="store.state.user.menuRoutes"></asideMenu>
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts">
import setting from '@/setting'
import asideMenu from './asideMenu.vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'
defineProps(['flag'])
let store = useStore()
let route = useRoute()


</script>

<style scoped lang="scss">
.logo {
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;

    img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin: 0 10px;

    }

    p {
        color: #fff;
        font-size: $base-logo-title-fontSize;
    }
}

.elscroll {
    height: calc(100vh - $base-menu-logo-height);

    .el-menu {
        border-right: none;
    }
}

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 260px;
//   height: 100%;
// }
</style>