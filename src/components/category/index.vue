
<template>
    <el-form :inline="true">
        <el-form-item label="一级分类">
            <el-select v-model="c1ID" @change="changeCategory1" :disabled="!props.flag">
                <el-option v-for="(item,index) in categoryData.c1" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="c2ID" @change="changeCategory2" :disabled="!props.flag">
                <el-option v-for="(item,index) in categoryData.c2" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select v-model="c3ID" @change="changeCategory3" :disabled="!props.flag">
                <el-option v-for="(item,index) in categoryData.c3" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { getCategory1,getCategory2,getCategory3 } from "@/api/product/attr";
import { onMounted, ref } from "vue";
const emit = defineEmits(['hasC3'])
const props = defineProps(['flag'])
const c1ID = ref('')
const c2ID = ref('')
const c3ID = ref('')
//分类数据
const categoryData = ref({
    c1: [{name:'',id:''}],
    c2: [{name:'',id:''}],
    c3: [{name:'',id:''}]
})
//获取分类1的数据
const GetCategory1 = async () => {
    let result:any = await getCategory1()
    if (result.code == 200) {
        categoryData.value.c1 = result.data
    }
}
//获取分类2的数据
const GetCategory2 = async () => {
    let result:any = await getCategory2(c1ID.value)
    if (result.code == 200) {
        categoryData.value.c2 = result.data
    }
}
//获取分类3的数据
const GetCategory3 = async () => {
    let result:any = await getCategory3(c2ID.value)
    if (result.code == 200) {
        categoryData.value.c3 = result.data
    }
}
//改变分类1的数据的时候触发的回调
const changeCategory1 = ()=>{
    c2ID.value = ''
    c3ID.value = ''
    categoryData.value.c3 = []
    GetCategory2()
}
//改变分类2的数据的时候触发的回调
const changeCategory2 = ()=>{
    c3ID.value = ''
    GetCategory3()
}

//改变分类3的数据的时候触发的回调
const changeCategory3 = ()=>{
    const data = {
        c1:c1ID.value,
        c2:c2ID.value,
        c3:c3ID.value
    }
    emit('hasC3',data)
}

onMounted(() => {
    GetCategory1()
})
</script>

<style scoped></style>