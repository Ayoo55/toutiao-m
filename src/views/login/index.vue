<template>
  <div class="login-container">
    <van-nav-bar title="登录" >
        <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>
    <van-form ref="loginForm" @submit="onSubmit">
    
    <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
    >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
       
    </van-field>

    <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
    >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>

        <template #button>
            <van-count-down :time="1000 * 60" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false" />
            <van-button class="send-sms-btn"  round size="small" type="default" native-type="button" @click="onSendSms" v-else>发验证码</van-button>
        </template>
    </van-field>
    <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import {login,sendSms} from '@/api/user.js'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
        user:{
            mobile:'',
            code:''
        },
        userFormRules:{
            mobile:[
                {
                    required:true,
                    message:'手机号不能为空'
                },
                {
                    pattern: /^1[3|5|7|8]\d{9}$/,
                    message:'手机号格式错误'
                }
            ],
            code:[
                {
                    required:true,
                    message:'验证码不能为空'
                },
                {
                    pattern: /^\d{6}$/,
                    message:'验证码格式错误'
                }
            ]
        },
        isCountDownShow : false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 点击提交，请求登录  准备请求登录接口user.js，按需导入login,调用login模块，传入数据user参数，捕获异常
    async onSubmit () {
        //  1.获取表单数据
        const user = this.user
        // 2.表单验证
        // 3.提交表单请求登录
        this.$toast.loading({
            message: '登陆中',
            forbidClick: true,
            duration:0
            });

        try{
            const res = await login(user)
            this.$toast.success('登录成功')
            console.log('登录成功',res.data.data);
            // 修改state数据
            this.$store.commit('setUser',res.data.data)
            this.$router.back()

        }
        catch(err){
            if(err.response.status === 400){
                this.$toast.fail('登录失败，手机号或验证码错误')
            }
            else{
                this.$toast.fail('登录失败，请稍后重试')
            }
        }



    },

    // 发送验证码
    async onSendSms(){
        // 校验手机号
        try{
            await this.$refs.loginForm.validate('mobile')
        }
        catch(err){
            return console.log('验证失败',err);
        }
        // 校验手机号通过，显示倒计时
        this.isCountDownShow = true

        // 请求发送验证码
        try{
            await sendSms(this.user.mobile)
            this.$toast('发送成功')
        }
        catch(err){
            isCountDownShow=false
            if(err.response.status===429){
                this.$toast('发送太频繁，请稍后重试')
            }
            else{
                this.$toast('发送失败，请稍后重试')

            }
        }
        
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>

