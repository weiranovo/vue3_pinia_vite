<!-- 存在bug----添加品牌 -->
<template>
    <div>
        <el-card>
            <category @hasC3="getC3" :flag="flag"></category>
        </el-card>
        <el-card style="margin-top:20px;">
            <div v-if="flag">
                <el-button  icon="plus" :disabled="!categoryId.c3" style="margin-bottom: 10px;" type="primary"
                    @click="addAttr">添加属性</el-button>
                <el-table border :data="tableList">
                    <el-table-column type="index" label="序号" width="80" />
                    <el-table-column prop="attrName" label="属性名称" width="120" />
                    <el-table-column label="属性值名称">
                        <template #default="{ row }">
                            <el-tag style="margin:5px;" v-for="(item) in row.attrValueList" :key="item.id">{{ item.valueName
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="品牌操作" width="120">
                        <template #default="{ row }">
                            <el-button size="small" type="primary" icon="Edit" @click="updateAttr(row)"></el-button>
                            <el-popconfirm :title="`确定要删除 ${row.attrName} 吗?`" @confirm="delAttr(row)">
                                <template #reference @>
                                    <el-button size="small" type="danger" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-else>
                <el-form>
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button icon="plus" type="primary" @click="addAttrValue"
                    :disabled="attrParams.attrName.trim().length < 2">添加属性值</el-button>
                <el-table border style="margin:10px 0;" :data="attrParams.attrValueList">
                    <el-table-column type="index" label="序号" width="80" />
                    <el-table-column prop="valueName" label="属性值名称">
                        <template #default="{ row,$index }">
                            <el-input v-inputFox v-if="row.attrFlag" v-model="row.valueName" @blur="toLook(row,$index)" placeholder="请输入属性值"></el-input>
                            <div v-else @click="toShow(row)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作" width="120">
                        <template #default="{$index}">
                            <el-popconfirm :title="`确定要删除吗?`" @confirm="delAttrValue($index)">
                                <template #reference>
                                    <el-button size="small" type="danger" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="save" :disabled="!attrParams.attrName || attrParams.attrValueList.length<=0 || !attrParams.attrValueList[0].valueName ">保存</el-button>
                <el-button @click="cancleAttr">取消</el-button>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts">
 export default {
    name:'Attr'
}
</script>
<script setup lang="ts">
import category from "@/components/category/index.vue";
import { getAttrInfo, addOrUpdateAttr,DelAttr } from "@/api/product/attr";
import { ref } from "vue";
import { ElMessage } from "element-plus";
//手机新增的属性的数据
const attrParams: any = ref({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3
})
//切换添加属性值的标记
const flag = ref(true)
//ID
const categoryId = ref({
    c1: '',
    c2: '',
    c3: ''
})
//table数据
const tableList = ref([])

//获取table数据
const getAttrInfoList = async () => {
    const result = await getAttrInfo(categoryId.value)
    tableList.value = result.data
}

//获取分类全部数据
const getC3 = async (data: any) => {
    categoryId.value.c1 = data.c1
    categoryId.value.c2 = data.c2
    categoryId.value.c3 = data.c3
    getAttrInfoList()
}

//添加属性
const addAttr = () => {
    Object.assign(attrParams.value, {
        attrName: '',
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3
    })
    flag.value = false
}
//修改属性
const updateAttr = (row:any) => {
    flag.value = false
    Object.assign(attrParams.value,JSON.parse(JSON.stringify(row)))
}

//删除属性
const delAttr = async(row:any)=>{
   const result:any = await DelAttr(row.id)
   console.log(tableList.value)
   if(result.code == 200){
    ElMessage.success("删除成功！")
    getAttrInfoList()
   }else{
    ElMessage.error('删除失败！')
   }
}

//添加属性值
const addAttrValue = () => {
    attrParams.value.attrValueList.push({
        valueName: '',
        attrFlag: true
    })
}
//保存按钮
const save = async () => {
    attrParams.value.categoryId = categoryId.value.c3
    let result: any = await addOrUpdateAttr(attrParams.value)
    if (result.code == 200) {
        flag.value = true
        //@ts-ignore
        ElMessage.success(attrParams.valuel && attrParams.valuel.id ? '修改成功' : '添加成功')
        getAttrInfoList()
    } else {
        //@ts-ignore
        ElMessage.error(attrParams.valuel && attrParams.valuel.id ? '修改失败' : '添加失败')
    }
}
//取消操作
const cancleAttr = () => {
    flag.value = true
}

//属性值表单元素失去焦点
const toLook = (row:any,$index:number)=>{
      if(row.valueName.trim() == ''){
        attrParams.value.attrValueList.splice($index,1)
        //@ts-ignore
        ElMessage.error('属性值不能为空！')
        return
      }
       const result = attrParams.value.attrValueList.some((item:any)=>{
            if(item!=row){
                 return item.valueName === row.valueName
            }
      })
      console.log(result)
      if(result){
        attrParams.value.attrValueList.splice($index,1)
        //@ts-ignore
        ElMessage.error('属性值不能重复！') 
        return
      }
      row.attrFlag = false
}

//属性值表单元素获得焦点
const toShow = (row:any)=>{
      row.attrFlag = true
}

//删除属性值
const delAttrValue = ($index:any)=>{
     attrParams.value.attrValueList.splice($index,1)
}
</script>

<style scoped></style>