<!-- 评论列表组件 -->
<template>
   <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
    >
        <CommentItem
        v-for="(item,index) in list" :key="index"
        :comment="item"></CommentItem>
        <!-- <van-cell 
            
            :title="item.content" /> -->
    </van-list>
    </template>

<script>
import {getComments} from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {

    name: 'CommentList',

    data () {
        return {
            loading: false,
            finished: false,
            offset:null,
            limit:10,
            error: false,
        };
    },

    components: {
        CommentItem
    },

    props: {
        source:{
            type:[Number,String,Object],
            required:true
        },
        list:{
            type:Array,
            default:()=>[]
        }
    },

    computed: {},

    methods: {
        async onLoad() {
            try{
                // 获取请求数据
                const {data} = await getComments({
                    type:'a',
                    source:this.source,
                    offset:this.offset,
                    limit:this.limit
                })

                // 将数据添加到列表中
                const {results} = data.data
                this.list.push(...results)

                // 文章评论数据传出
                this.$emit('onload-success',data.data)

                // loading 加载状态设为 false
                this.loading = false

                // 判断是否还有数据，有就更新获取下一页的数据页码
                if(results.length){
                    this.offset = data.data.last_id
                }
                else{
                    this.finished = true
                }
            }
            catch(err){
                this.error = true
                this.loading = false
            }
        },

    },

    created () {
        this.onLoad()
    },

    watch: {},


}
</script>
<style lang='less' scoped>

</style>