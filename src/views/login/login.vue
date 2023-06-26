<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">

            </el-col>
            <el-col :span="12" :xs="24">

                <el-form class="login_form" ref="ruleFormRef" :model="loginForm" :rules="rules">
                    <h1>hello</h1>
                    <h2>欢迎来到后台管理界面！</h2>
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" :prefix-icon="User"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" :prefix-icon="Lock" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" type="primary" style="width: 100%;" @click="submit">
                            登陆
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// import { ElMessage } from 'element-plus'

const store = useStore()
const router = useRouter()
console.log(store.state.user.token)

const loading = ref(false)

//表单数据
let loginForm = reactive({
    username: 'admin',
    password: '111111'
})
//校验密码
// @ts-ignore：
const validatePass = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('密码不能为空！'))
    } else {
        callback()
    }

}
//校验规则
const rules = {
    username: [
        { required: true, message: '请输入用户名！', trigger: 'blur' }
    ],
    password: [
        { validator: validatePass, trigger: 'blur' }
    ]
}

//校验按钮
const ruleFormRef = ref()
const submit = () => {
    loading.value = true
    ruleFormRef.value.validate((val: any) => {
        if (val) {
            store.dispatch("user/userLogin", loginForm).then((res) => {
                console.log(res)
                loading.value = false
// @ts-ignore
                ElMessage.success('chenggong!')
                router.push('/')
                
            }).catch((err) => {
                loading.value = false
                router.push('/404')
// @ts-ignore
                ElNotification({
                    type:'error',
                    message:err.message

                })
            })
        }
    })
}

</script>

<style scoped lang="scss">
.login_container {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        top: 50%;
        width: 80%;
        // transform: translateY(-50%);
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            font-size: 40px;
            color: #fff;
        }

        h2 {
            font-size: 20px;
            color: #fff;
            margin: 20px 0;
        }
    }
}
</style>