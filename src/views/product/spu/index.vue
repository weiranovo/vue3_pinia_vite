<template>
    <div>
        <el-card>
            <category @hasC3="getC3" :flag="flag"></category>
        </el-card>
        <el-card style="margin-top:20px;">
            <div v-show="scene == 0">
                <el-button icon="plus" :disabled="!c3" style="margin-bottom: 10px;" type="primary"
                    @click="addSPU">添加spu</el-button>
                <el-table border :data="tableInfo" v-loading="loading">
                    <el-table-column type="index" label="序号" width="80" />
                    <el-table-column prop="spuName" label="SPU名称" />
                    <el-table-column label="spu描述" prop="description"></el-table-column>
                    <el-table-column label="SPU操作">
                        <template #default="{ row }">
                            <el-button size="small" type="primary" icon="plus" title="添加SKU"
                                @click="addSKU(row)"></el-button>
                            <el-button size="small" type="warning" icon="Edit" title="编辑SPU"
                                @click="editSPU(row)"></el-button>
                            <el-button size="small" icon="View" title="查看SPU" @click="findSkuInfo(row)"></el-button>
                            <el-popconfirm :title="`确定要删除 ${row.attrName} 吗?`" @confirm="deleteSpu(row)">
                                <template #reference>
                                    <el-button size="small" type="danger" icon="Delete" ></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="height:30px;"></div>
                <el-pagination small :background="true" v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[3, 5, 7, 9]" layout="prev, pager, next, jumper, ->,total, sizes" :total=total />
            </div>
            <spuForm ref="spu" v-show="scene == 1" @cancel="spuCancel" :c3="c3"></spuForm>
            <skuForm ref="sku" v-show="scene == 2" @change-sence="skuCancel"></skuForm>
        </el-card>

        <el-dialog v-model="dialogTableVisible">
            <el-table :data="skuInfo">
                <el-table-column property="skuName" label="名称" />
                <el-table-column property="price" label="价格" />
                <el-table-column property="weight" label="重量" />
                <el-table-column property="skuDefaultImg" label="图片信息">
                    <template #default="{ row }">
                        <img :src="row.skuDefaultImg" alt="" style="width:100%;height:100%;">
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import category from "@/components/category/index.vue";
import spuForm from './components/spuForm.vue'
import skuForm from './components/skuInfo.vue'
//@ts-ignore
import { getSkuList, findSku, delSPU } from "@/api/product/spu";
import { ref, watch, computed } from "vue";
const spu: any = ref(null)
const sku: any = ref(null)
//sku信息
const skuInfo = ref([])
const dialogTableVisible = ref(false)
//切换场景
const scene: any = ref(0)
//切换添加属性值的标记
const flag = computed(() => {
    if (scene.value !== 0) {
        return false
    } else {
        return true
    }
})
//tableLoading
const loading = ref(false)
//获取c3id && 获得数据
const c1 = ref('')
const c2 = ref('')
const c3 = ref('')
const getC3 = (data: any) => {
    c1.value = data.c1
    c2.value = data.c2
    c3.value = data.c3
    getTableInfo()
}
//分页器数据
const currentPage: any = ref(1)
const pageSize: any = ref(3)
const total: any = ref(0)
//列表数据
let tableInfo = ref([])
//获取列表数据
const getTableInfo = async () => {
    loading.value = true
    let params = { category3Id: c3.value }
    const result: any = await getSkuList(currentPage.value, pageSize.value, params)
    if (result.code == 200) {
        total.value = result.data.total
        tableInfo.value = result.data.records
        loading.value = false
    }
}
//分页器改变时的数据
watch([currentPage, pageSize], async (newVal) => {
    currentPage.value = newVal[0]
    pageSize.value = newVal[1]
    await getTableInfo()
})
//添加SPU按钮
const addSPU = () => {
    scene.value = 1
    spu.value.initAddSpuData(c3.value)
}

//编辑SPU
const editSPU = (row: any) => {
    scene.value = 1
    spu.value.initHasSpuData(row)
}
//添加sku
const addSKU = (row: any) => {
    scene.value = 2
    sku.value.initSkuData(c1.value, c2.value, row)
}
//spu取消按钮
const spuCancel = (val: any) => {
    scene.value = val
    getTableInfo()
}
const skuCancel = (val: any) => {
    scene.value = val
}
//查看sku
const findSkuInfo = async (row: any) => {
    dialogTableVisible.value = true
    let result: any = await findSku(row.id)
    if (result.code == 200) {
        skuInfo.value = result.data
    }
}
//删除spu
const deleteSpu = async (row: any) => {
    let result: any = await delSPU(row.id)
    console.log(result)
    if (result.code == 200) {
        //@ts-ignore
        ElMessage.success('删除成功！')
        getTableInfo()
    } else {
        //@ts-ignore
        ElMessage.success('删除失败！')
    }
}
</script>

<style scoped></style>