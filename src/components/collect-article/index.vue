<template>
   <van-icon
        :name="value ? 'star' : 'star-o'"
        :class="{collected : value}"
        @click="onCollect"
        :loading="loading"
    />
</template>

<script>
import {addCollect,deleteCollect} from '@/api/article'
export default {

    name: 'CollectArticle',

    data () {
        return {
            loading:false
        };
    },

    components: {},

    props: {
        value:{
            required:true,
            type:Boolean
        },
        articleId:{
            required:true,
            type:[Number,String,Object]
        }
    },

    computed: {},

    methods: {
        async onCollect(){
            this.loading = true
            try{
                if(this.value){
                    // 已收藏
                    await deleteCollect(this.articleId)
                }
                else{
                    await addCollect(this.articleId)
                }
                this.$emit('input',!this.value)
                this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
            }
            catch(err){
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