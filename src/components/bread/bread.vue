<template>
    <div>
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="{ path: `${item.path}` }">{{
                item.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
let breadList: any = ref([])
const changeBread = (value: any) => {
    breadList.value = []
    if (value[0].name === 'layout') {
        breadList.value = [value[1]]
    } else {
//@ts-ignore
        value.forEach((item) => {
            breadList.value.push(item)
        });
        if (breadList.value[0].meta.title !== '首页') {
            breadList.value.unshift({
                path: '/',
                meta: {
                    title: '首页'
                }
            })
        }
    }
}
watch(() => route.matched, (newval) => {
    changeBread(newval)
    
}, { immediate: true })
</script>

<style scoped lang="scss"></style>