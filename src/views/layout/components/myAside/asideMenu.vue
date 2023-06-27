<template>
    <div>
        <template v-for="(item) in menuList" :key="item.path">
        <!-- 没有子路由 -->
            <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
                <template #title>
                    <el-icon><component :is="item.meta.icon"></component></el-icon>
                     <p>{{ item.meta.title }}</p>
                </template>
            </el-menu-item>
        <!-- 一个子路由 -->
            <el-menu-item v-if="item.children && item.children.length == 1" :index="item.children[0].path">{{item.children[0].meta.title }}</el-menu-item>
        <!-- 子路由 -->
            <el-sub-menu v-if="item.children && item.children.length !== 1" :index="item.path">
                <template #title>
                    <el-icon><component :is="item.meta.icon"></component></el-icon>
                    <p>{{ item.meta.title }}</p>
                </template>
                <asideMenu :menuList="item.children"></asideMenu>
            </el-sub-menu>
        </template>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    menuList: {
        type: Array<any>,
        default: () => ([])
    }
})
console.log(props.menuList)
</script>

<script lang="ts">
export default {
    name:"asideMenu"
}
</script>

<style scoped lang="scss"></style>