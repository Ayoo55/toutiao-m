<template>
    <div class="update-birthday">
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('close')"
            @confirm="onConfirm"
        />
    </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
import dayjs from 'dayjs';
export default {

    name: 'UpdateBirthday',

    data () {
        return {
            minDate: new Date(1970, 0, 1),
            maxDate: new Date,
            currentDate: new Date(this.value)
        };
    },

    components: {},

    props: {
        value:{
            type:String,
            required:true
        }
    },

    computed: {},

    methods: {
        // onUpdateBirthday(value){
        //     this.currentDate = value
        // },
        async onConfirm(){
            console.log(this.currentDate);
            this.$toast.loading({
                message:'保存中···',
                forbidClick:true, //禁止背景点击
                duration:0 //持续展示

            })
            try{
                // loading 状态
                
                const currentDate = dayjs(this.currentDate).format('YYYY-MM--DD')
                console.log(currentDate);
                
                await updateUserProfile({
                    birthday:currentDate,
                })
                // 更新视图
                this.$emit('input',currentDate)
                // 关闭弹层
                this.$emit('close')
                
                // 提示成功
                this.$toast.success('更新成功')

            }
            catch(err){
                this.$toast.fail('编辑昵称失败，请稍后重试')
            }
        },
    },

    created () {},

    watch: {},


}
</script>
<style lang='less' scoped>

</style>