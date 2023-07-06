<template>
    <div>
        <el-card>
            <!-- <myTable :config="table_config"></myTable> -->
            <el-button icon="plus" style="margin-bottom: 10px;" type="primary" @click="addBrand">添加品牌</el-button>
            <el-table border :data="tableList" v-loading="loading">
                <el-table-column type="index" label="序号" width="80" />
                <el-table-column prop="tmName" label="品牌名称" width="80" />
                <el-table-column prop="logoUrl" label="品牌LOGO" width="100">
                    <template #default="{ row }">
                        <img :src="row.logoUrl" alt="出错啦！！！" style="width:80px;height:80px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #default="{ row }">
                        <el-button size="small" type="primary" icon="Edit" @click="editBrand(row)"></el-button>
                        <el-popconfirm :title="`确定要删除 ${row.tmName} 吗?`" @confirm="deleteBrand(row.id)">
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
        </el-card>

        <!-- dialog -->
        <el-dialog v-model="dialogFormVisible" :title="brandForm.id ? '修改品牌' : '添加品牌'">
            <el-form ref="ruleFormRef" :model="brandForm" :rules="rules" style="width:80%;">
                <el-form-item label="品牌名称" prop="tmName" label-width="90px">
                    <el-input v-model="brandForm.tmName" placeholder="请输入品牌名称" />
                </el-form-item>
                <el-form-item label="品牌logo" prop="logoUrl" label-width="90px">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="brandForm.logoUrl" :src="brandForm.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="diaConfirm(brandForm)">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reqHasTrademark, deleteTrademark, reqADDorUpdateTrademark } from "@/api/product/trademark";
import { onMounted, ref, watch, nextTick } from "vue";
// import myTable from "@/components/myTable/index.vue";
//table_config
// const table_config = {
//     t_head:[
//         {label:'品牌名称',prop:'tmName'},
//         {label:'品牌LOGO',prop:'logoUrl'},   
//         {label:'品牌操作'},   
//     ],
//     checkBox:true,
//     url:'/admin/product/baseTrademark/'
// }
//formref
const ruleFormRef = ref(null)
//loading
const loading = ref(false)
//dialog标识
const dialogFormVisible = ref(false)
//分页器数据
const currentPage = ref(1)
const pageSize = ref(3)
const total = ref(0)
//table数据
const tableList: any = ref([])
//dialog_form
const brandForm: any = ref({
    logoUrl: '',
    tmName: ''
})
//校验品牌名称
const valiTmName = (_rule: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error('品牌名称必须大于两位数！'))
    }
}
//form_rule
const rules = {
    tmName: [
        { required: true, trigger: 'blur', validator: valiTmName }
    ],
    logoUrl: [
        { required: true, message: '请输入图片！', trigger: 'blur' }
    ],
}
//分页器改变时触发
watch([currentPage, pageSize], async (newVal) => {
    currentPage.value = newVal[0]
    pageSize.value = newVal[1]
    await getHasTrademark()
})

//获取table数据
const getHasTrademark = async () => {
    loading.value = true
    let result = await reqHasTrademark(currentPage.value, pageSize.value)
    if (result.code == 200) {
        tableList.value = result.data.records
        total.value = result.data.total
        loading.value = false
    } else {
        loading.value = false
    }
}

//文件上传前的方法
const beforeAvatarUpload: any = (rawFile: any) => {
    if (rawFile.type !== 'image/jpeg') {
        //@ts-ignore
        ElMessage.error('必须为图片！')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        //@ts-ignore
        ElMessage.error('图片不能超过2m')
        return false
    }
    return true
}

//文件上传成功
//@ts-ignore
const handleAvatarSuccess: any = (response: any, uploadFile: any) => {
    // brandForm.value.logoUrl = URL.createObjectURL(uploadFile.raw)
    brandForm.value.logoUrl = response.data
    //@ts-ignore    
    ruleFormRef.value.clearValidate('logoUrl')
}

//dialog 确定按钮
const diaConfirm = (data: any) => {
    //@ts-ignore
    ruleFormRef.value.validate(async (val: any) => {
        if (val) {
            console.log(data)
            await reqADDorUpdateTrademark(data)
            //@ts-ignore
            ElMessage.success('成功！')
            dialogFormVisible.value = false
            getHasTrademark()
        }
    })
}
//取消按钮
const cancel = () => {
    dialogFormVisible.value = false
}
//添加品牌
const addBrand = () => {
    dialogFormVisible.value = true
    brandForm.value.logoUrl = ''
    brandForm.value.tmName = ''
    brandForm.value.id = ''
    nextTick(() => {
        //@ts-ignore
        ruleFormRef.value.clearValidate()
    })

}
//修改品牌
const editBrand = async (row: any) => {
    dialogFormVisible.value = true
    Object.assign(brandForm.value, row)
    nextTick(() => {
        //@ts-ignore
        ruleFormRef.value.clearValidate()
    })
}
//删除品牌
const deleteBrand = async (id: number) => {
    let result = await deleteTrademark(id)
    console.log(result)
    //@ts-ignore
    ElMessage.success('删除成功！！')
    getHasTrademark()
}
onMounted(() => {
    getHasTrademark()
})



</script>

<style scoped lang="scss">
:deep(.avatar-uploader .el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 100%;
    height: 100%;
}
</style>