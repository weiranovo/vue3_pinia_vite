<template>
    <div>
        <el-form label-width="80px">
            <el-form-item label="sku名称">
                <el-input placeholder="sku名称" v-model="skuForm.skuName" />
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input type="number" placeholder="价格(元)" v-model="skuForm.price" />
            </el-form-item>
            <el-form-item label="重量(g)">
                <el-input type="number" placeholder="重量(g)" v-model="skuForm.weight" />
            </el-form-item>
            <el-form-item label="sku描述">
                <el-input type="textarea" placeholder="sku描述" v-model="skuForm.skuDesc" />
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item) in attrInfo" :key="item.id" :label="item.attrName">
                        <el-select v-model="item.attrIdAndValueId">
                            <el-option v-for="attrValue in item.attrValueList" :key="attrValue.id"
                                :label="attrValue.valueName" :value="`${item.id}:${attrValue.id}`"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true" v-for="(item) in spuSaleAttrList" :key="item.id" :label="item.saleAttrName">
                    <el-form-item label="颜色">
                        <el-select v-model="item.saleIdAndValueId">
                            <el-option v-for="saleAttrValue in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                                :label="saleAttrValue.saleAttrValueName"
                                :value="`${item.id}:${saleAttrValue.id}`"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table ref="skuRef" border :data="spuImgList">
                    <el-table-column type="selection" width="80px" align="center"></el-table-column>
                    <el-table-column label="图片">
                        <template #default="{ row }">
                            <img :src="row.imgUrl" :alt="row.imgUrl.startsWith('blob') ? '404' : row.imgUrl"
                                style="width:100%;height:100%">
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="imgName"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button type="primary" @click="bandle(row)">设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit">确定</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { getAttrInfo } from '@/api/product/attr'
import { getSpuImgList, getSpuSaleAttrList, reqAddSku } from "@/api/product/spu";
import { ref } from "vue";
const emit = defineEmits(['changeSence'])
const skuRef: any = ref(null)
const attrInfo: any = ref([])
const spuImgList: any = ref([])
const spuSaleAttrList: any = ref([])
const skuForm = ref({
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: ''
})
//取消按钮
const cancel = () => {
    emit('changeSence', 0)
}
//初始化sku
const initSkuData = async (c1: number, c2: number, row: any) => {
    Object.assign(skuForm.value,{
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: ''
})
    const data = { c1: c1, c2: c2, c3: row.category3Id }
    let result: any = await getAttrInfo(data)
    if (result.code == 200) {
        attrInfo.value = result.data
    }
    let result1: any = await getSpuImgList(row.id)
    if (result1.code == 200) {
        spuImgList.value = result1.data
    }
    let result2: any = await getSpuSaleAttrList(row.id)
    if (result2.code == 200) {
        spuSaleAttrList.value = result2.data
    }
    skuForm.value.category3Id = row.category3Id
    skuForm.value.tmId = row.tmId
    skuForm.value.spuId = row.id
}
//设置图片
const bandle = (row: any) => {
    skuForm.value.skuDefaultImg = row.imgUrl
    spuImgList.value.forEach((item: any) => {
        skuRef.value.toggleRowSelection(item, false)
    })
    skuRef.value.toggleRowSelection(row, true)
}
//提交按钮
const submit = async() => {
    let attrArr = attrInfo.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':')
            prev.push({
                attrId,
                valueId
            })
        }
        return prev
    }, [])
    skuForm.value.skuAttrValueList = attrArr
    let saleArr = spuSaleAttrList.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
            prev.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return prev
    }, [])
    skuForm.value.skuSaleAttrValueList = saleArr
    let result:any = await reqAddSku(skuForm)
    console.log(result)
    if(result.code == 200){
        //@ts-ignore
        ElMessage.success('添加成功！')
        emit('changeSence', 0)
    }else{
        //@ts-ignore
        ElMessage.success('添加失败！')
    }
}
defineExpose({ initSkuData })
</script>

<style scoped></style>