<template>
    <div>
        <el-form label-width="80px">
            <el-form-item label="SPU名称">
                <el-input v-model="spuParams.spuName" placeholder="请输入SPU名称"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select v-model="spuParams.tmId" placeholder="请选择SPU品牌">
                    <el-option v-for="item in spuBrand" :key="item.id" :label="item.tmName" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input v-model="spuParams.description" type="textarea" placeholder="请输入SPU描述"></el-input>
            </el-form-item>
            <el-form-item label="SPU图标">
                <el-upload v-model:file-list="spuImageList" action="/api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :before-upload="beforePicUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select v-model="sallAttrIdAndName"
                    :placeholder="unSelectedAttr.length ? `还未选择${unSelectedAttr.length}个` : '无'">
                    <el-option v-for="item in unSelectedAttr" :key="item.id" :label="item.name"
                        :value="`${item.id}:${item.name}`" />
                </el-select>
                <el-button :disabled="!sallAttrIdAndName" @click="addSallAttr">添加属性值</el-button>
                <el-table border :data="spuAttrList">
                    <el-table-column type="index" label="序号" width="80" />
                    <el-table-column label="销售属性名字" prop="saleAttrName"></el-table-column>
                    <el-table-column label="销售属性值">
                        <template #default="{ row }">
                            <el-tag v-for="(tag, index) in row.spuSaleAttrValueList"
                                @close="row.spuSaleAttrValueList.splice(index, 1)" :key="tag.id" closable
                                style="margin-right:5px">
                                {{ tag.saleAttrValueName }}
                            </el-tag>
                            <el-input v-model="row.saleAttrValue" v-if="row.flag" @blur="confirmSaleAttrValue(row)"
                                v-inputFox size="small" style="width:20%"></el-input>
                            <el-button v-else icon="plus" @click="AddSaleAttrFlag(row)" type="primary"
                                size="small"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template #default="{ $index }">
                            <el-button type="primary" size="small" @click="spuAttrList.splice($index, 1)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button @click="saveBtn">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height:100%;" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { getTrademarkList, getSpuImgList, getSpuSaleAttrList, getAllSallAttr, addOrUpdateSpuInfo } from "@/api/product/spu";
import { ref, computed } from "vue";
//sku品牌数据
const spuParams:any = ref({
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: []
})
const spuBrand: any = ref([])
const spuImageList: any = ref([])
const spuAttrList: any = ref([])
const allSpuAttrList: any = ref([])
//销售属性名字与id
const sallAttrIdAndName = ref('')

//计算出没有的销售属性
const unSelectedAttr = computed(() => {
    return allSpuAttrList.value.filter((item:any) => {
        return spuAttrList.value.every((item1:any) => {
            return item.name != item1.saleAttrName
        })
    })
})
//emit
const emit = defineEmits(['cancel'])
//props
// const props = defineProps(['c3'])
//取消按钮
const cancel = () => {
    emit('cancel', 0)
}
//获取SPU品牌的数据
const getSpuBrand = async () => {
    let result = await getTrademarkList()
    if (result.code == 200) {
        spuBrand.value = result.data
    }
}
//获取SPU图片的数据
const getSpuImg = async (row: any) => {
    let result:any = await getSpuImgList(row.id)
    if (result.code == 200) {
        spuImageList.value = result.data.map((item:any) => {
            return {
                name: item.imgName,
                url: item.imgUrl
            }
        })
    }
}
//获取spu属性列表
const getSpuAttr = async (row: any) => {
    let result:any = await getSpuSaleAttrList(row.id)
    if (result.code == 200) {
        spuAttrList.value = result.data
    }
}
//获取全部spu属性列表
const getAllSpuAttr = async () => {
    let result: any = await getAllSallAttr()
    if (result.code == 200) {
        allSpuAttrList.value = result.data
    }
}
//点击编辑初始化
const initHasSpuData = (row: any) => {
    spuParams.value = row
    getSpuBrand()
    getSpuImg(row)
    getSpuAttr(row)
    getAllSpuAttr()
}
const initAddSpuData = (c3id: any) => {
    Object.assign(spuParams.value, {
        category3Id: '',
        spuName: '',
        description: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: []
    })
    spuParams.value.id = ''
    console.log(spuParams.value)
    spuImageList.value = []
    spuAttrList.value = []
    sallAttrIdAndName.value = ''
    spuParams.value.category3Id = c3id
    getSpuBrand()
    getAllSpuAttr()
}
//照片墙预览
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handlePictureCardPreview = (uploadFile: any) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}
const beforePicUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg') {
        if (file.size / 1024 / 1024 < 3) {
            return true
        } else {
            ElMessage.error('上传的文件不能超过3M')
            return false
        }
    } else {
        ElMessage.error('上传的文件格式错误')
        return false
    }
}

//添加销售属性
const addSallAttr = () => {
    spuAttrList.value.push({
        saleAttrName: sallAttrIdAndName.value.split(':')[1],
        baseSaleAttrId: sallAttrIdAndName.value.split(':')[0],
        spuSaleAttrValueList: []
    })
    sallAttrIdAndName.value = ''

}

//属性值添加按钮
const AddSaleAttrFlag = (row: any) => {
    row.flag = true
    row.saleAttrValue = ''
}
const confirmSaleAttrValue = (row: any) => {
    row.flag = false
    //判断属性值为空
    if (row.saleAttrValue.trim() == '') {
        ElMessage.error('属性值不能为空！')
        return
    }
    //判断属性值是否在数组当中存在
    const repeat = row.spuSaleAttrValueList.findIndex((item: any) => {
        return item.saleAttrValueName == row.saleAttrValue
    })
    if (repeat !== -1) {
        //@ts-ignore
        ElMessage.error('属性值重复！')
        return
    }
    row.spuSaleAttrValueList.push({
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: row.saleAttrValue
    })
}
//保存按钮
const saveBtn = async () => {
    //图片信息整合
    spuParams.value.spuImageList = spuImageList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
    //整理销售属性
    spuParams.value.spuSaleAttrList = spuAttrList.value
    let result: any = await addOrUpdateSpuInfo(spuParams.value)
    if (result.code == 200) {
        //@ts-ignore
        ElMessage.success(spuParams.value.id ? '更新成功！' : '添加成功！')
    } else {
        //@ts-ignore
        ElMessage.error(spuParams.value.id ? '更新失败！' : '添加失败！')
    }
    emit('cancel', 0)
    console.log(spuParams.value)
}

defineExpose({ initHasSpuData, initAddSpuData })
</script>

<style scoped lang="scss"></style>