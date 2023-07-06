<template>
    <el-table border :data="tableList" v-loading="loading">
        <el-table-column v-if="table_config.index"  type="index"  label="序号" width="50" />
        <el-table-column v-if="table_config.checkBox"  type="selection" width="35" />
        <el-table-column v-for="(item,index) in table_config.t_head" :key="index"  :label="item.label" :prop="item.prop"  />
    </el-table>
    <el-pagination small :background="true" v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[3, 5, 7, 9]" layout="prev, pager, next, jumper, ->,total, sizes" :total=total />
</template>

<script setup lang="ts">
import { onMounted, ref,watch } from "vue";
//@ts-ignore
import { getTableData } from "@/api/common/tableInfo";
const prop = defineProps({
    config: {
        type: Object,
        default: () => ({})
    }
})
//loading
const loading = ref(false)
//table数据
const table_config:any = ref({
    t_head:[],
    checkBox: false,
    index: false,
    url:''
})
//页码
const currentPage = ref(1)
const pageSize = ref(3)
const total = ref(0)
//列表数据
const tableList = ref([])
onMounted(()=>{
    initConfig()

})
//初始化table数据
const initConfig = ()=>{
    for(let key in table_config.value){
        if(Object.keys(prop.config).includes(key)){
            table_config.value[key] = prop.config[key]
        }
    }
    getHasTrademark()
}

//获取table数据
const getHasTrademark = async () => {
    loading.value = true
    const data = {
        page:currentPage.value,
        limit:pageSize.value,
        url:table_config.value.url
    }
    let result = await getTableData(data)
    if (result.code == 200) {
        tableList.value = result.data.records
        total.value = result.data.total
        loading.value = false
    } else {
        loading.value = false
    }
}

watch([currentPage, pageSize], async (newVal) => {
    currentPage.value = newVal[0]
    pageSize.value = newVal[1]
    await getHasTrademark()
})

</script>

<style scoped></style>