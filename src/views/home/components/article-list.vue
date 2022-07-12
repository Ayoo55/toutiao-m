<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" :success-text="refreshSuccessText"  @refresh="onRefresh" success-duration="1000">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            >
            <ArticleItem v-for="(item,index) in list" :key="index" :article="item" ></ArticleItem>

            <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
        </van-list>
    </van-pull-refresh>
    
  </div>
</template>

<script>
import {getArticles} from '@/api/article.js'
import ArticleItem from '@/components/article-item/index.vue'
export default {
    name:'ArticleList',
    props:{
        channel:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            timestamp:null,
            error: false,
            isLoading: false,
            refreshSuccessText:'刷新成功'
        };
    },
    methods: {
        // 获取文章列表数据
        async onLoad() {
            try{
                const {data} = await getArticles({
                    channel_id:this.channel.id,
                    timestamp:this.timestamp || Date.now()
                })
                const {results} = data.data
                // 将新获取的数据，增加到列表中
                this.list.push(...results)
                // 数据不需要重新加载，下次滚动到底边会触发 loading 为 true
                this.loading = false

                if(results.length){
                    // 当数组中还有数据，则更新 timestamp ，更新页码
                    this.timestamp = data.data.pre_timestamp
                }
                else{
                    // 没有数据则 显示加载完成
                    this.finished = true
                }

            }
            catch(err){
                this.error = true
                this.loading = false
            }
            
        },

        // 下拉刷新
        async onRefresh() {
            // 请求获取数据
            try{
                const {data} = await getArticles({
                    channel_id:this.channel.id,
                    timestamp: Date.now()
                })

                // if(Math.random() > 0.2){
                //     JSON.parse('ashdah')
                // }

                const {results} = data.data

                // 将数据追加到列表顶部
                this.list.unshift(...results)

                // 关闭下拉刷新到 loading 状态
                this.isLoading=false

                // 成功提示
                this.refreshSuccessText = `刷新成功，获取到${results.length}条数据`
              

            }
            catch(err){
                this.isLoading = false
                this.refreshSuccessText = `刷新失败`

                
            }

            

        }
  
    },
    components:{
        ArticleItem
    }
}
</script>

<style scoped lang="less">
.article-list{
    height: 79vh;
    overflow-y: auto;
}
</style>