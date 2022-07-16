<template>
    <div class="update-gender">
        <van-picker 
            show-toolbar 
            title="标题" 
            :columns="columns" 
            :default-index="value" 
            @confirm="onConfirm"
            @cancel="$emit('close')"
            @change="onPickerChange"
        />
    </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'

export default {

    name: 'UpdateGender',

    data () {
        return {
            columns: ['男', '女'],
            localGender:0

        };
    },

    components: {},

    props: {
        value:{
            type:Number,
            required:true
        }
    },

    computed: {},

    methods: {
        
        async onConfirm(){
            try{
                // loading 状态
                this.$toast.loading({
                    message:'保存中···',
                    forbidClick:true, //禁止背景点击
                    duration:0 //持续展示

                })
                const localGender = this.localGender
                
                await updateUserProfile({
                    gender:this.localGender,
                })
                // 更新视图
                this.$emit('input',localGender)
                // 关闭弹层
                this.$emit('close')
                
                // 提示成功
                this.$toast.success('更新成功')

            }
            catch(err){
                this.$toast.fail('编辑昵称失败，请稍后重试')
            }
        },
        onPickerChange(picker,value,index){
            this.localGender = index
        }
    },

    created () {},

    watch: {},


}
</script>
<style lang='less' scoped>

</style>