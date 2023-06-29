<template>
        <template v-for="(item) in menuList" :key="item.path">
            <!-- 没有子路由 -->
            <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <!-- 一个子路由 -->
            <el-menu-item v-if="item.children && item.children.length == 1" :index="item.children[0].path">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
            <!-- 子路由 -->
            <el-sub-menu v-if="item.children && item.children.length !== 1" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <asideMenu :menuList="item.children"></asideMenu>
            </el-sub-menu>
        </template>
</template>

<script setup lang="ts">
defineProps({
    menuList: {
        type: Array<any>,
        default: () => ([])
    }
})
</script>

<script lang="ts">
export default {
    name: "asideMenu"
}
</script>

<style scoped lang="scss"></style>