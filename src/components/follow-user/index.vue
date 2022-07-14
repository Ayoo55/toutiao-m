<template>
     <!-- 已关注 is_followed 为 true -->
    <van-button
        v-if="isFollowed"
        class="follow-btn"
        round
        size="small"
        @click="onFollow"
        :loading="loading"
    >已关注</van-button>

    <!-- 未关注 -->
    <van-button
        v-else
        class="follow-btn"
        type="info"
        color="#3296fa"
        round
        size="small"
        icon="plus"
        @click="onFollow"
        :loading="loading"
    >关注</van-button>
          

</template>

<script>
import {addFollow,deleteFollow} from '@/api/user'

export default {

    name: 'FollowUser',

    data () {
        return {
            loading:false
        };
    },

    components: {},
    model:{
        prop:'isFollowed',
        event:'update-is_followed'
    },

    props: {
        isFollowed:{
            required:true,
            type:Boolean
        },
        userId:{
            required:true,
            type:[Number,String,Object]
        }
    },

    computed: {},

    methods: {
            // 关注/取消关注
            // • 封装接口
            // • 导入接口
            // • 添加点击事件，同一个事件名 ，稍后判断是否已关注即可
            // • 完成点击事件函数的书写
            // 	○ 先判断用户是否是关注状态，如果是，则调用取消关注接口，如果否，则调用关注接口
            // 	○ 点击后，将关注状态取反
            // • 不能关注自己
            //  ○  关注自己程序会报错，判断报错状态是否为400

            async onFollow(){
                this.loading=true
                try{
                    if(this.isFollowed){
                        // 已关注
                        await deleteFollow(this.userId)
                    }
                    else{
                        // 未关注
                        await addFollow(this.userId)

                    }
                    // this.article.is_followed = !this.article.is_followed
                    this.$emit('update-is_followed',!this.isFollowed)
                }
                catch(err){
                    let msg = '操作失败'
                    if(err.response && err.response.status === 400){
                        msg = '你不能关注你自己！'
                    }
                    this.$toast(msg)
                }
                this.loading=false

            }
    },

    created () {},

    watch: {},


}
</script>
<style lang='less' scoped>

</style>