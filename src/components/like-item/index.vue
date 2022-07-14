<template>
   <van-icon
        :name="value === 1 ? 'good-job' : 'good-job-o'"
        :class="{like : value === 1}"
        @click="onLike"
        :loading="loading"
    />
</template>

<script>
import {addLike,deleteLike} from '@/api/article'
export default {

    name: 'LikeArticle',

    data () {
        return {
            loading:false
        };
    },

    components: {},

    props: {
        value:{
            required:true,
            type:Number
        },
        articleId:{
            required:true,
            type:[Number,String,Object]
        }
    },

    computed: {},

    methods: {
        async onLike(){
            this.loading = true
            try{
                let status = -1
                if(this.value === 1){
                    // 已点赞
                    await deleteLike(this.articleId)
                }
                else{
                    status = 1
                    await addLike(this.articleId)
                }
                this.$emit('input',status)
                this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
            }
            catch(err){
                console.log(err);
                this.$toast.fail('操作失败，请重试！')

            }
            this.loading = false
        }
    },

    created () {},

    watch: {},


}
</script>
<style lang='less' scoped>
/deep/.collected{
    color: #ffa500;
}
</style>