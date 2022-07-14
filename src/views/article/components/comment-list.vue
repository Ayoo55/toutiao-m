<template>
   <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <van-cell 
            v-for="(item,index) in list" :key="index" 
            :title="item.content" />
    </van-list>
    </template>

<script>
import {getComments} from '@/api/comment'
export default {

    name: 'CommentList',

    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            offset:null,
            limit:10
        };
    },

    components: {},

    props: {
        source:{
            type:[Number,String,Object],
            required:true
        }
    },

    computed: {},

    methods: {
        async onLoad() {
            try{
                const {data} = await getComments({
                    type:'a',
                    source:this.source,
                    offset:this.offset,
                    limit:this.limit
                })
                const {results} = data.data
                this.list.push(...results)
                this.loading = false

                if(results.length){
                    this.offset = data.data.last_id
                }
                else{
                    this.finished = true
                }
            }
            catch(err){
                console.log('获取评论失败，请稍后重试',err);
            }
        },

    },

    created () {
    },

    watch: {},


}
</script>
<style lang='less' scoped>

</style>