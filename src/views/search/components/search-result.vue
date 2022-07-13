<template>
   <div class="search-result">
      <van-list
         v-model="loading"
         :finished="finished"
         finished-text="没有更多了"
         @load="onLoad"
         :error.sync="error"
         error-text="请求失败，点击重新加载"
         >
         <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
      </van-list>
   </div>
</template>

<script>
import {getSearchResults} from '@/api/search'
export default {

   name: 'SearchResult',

   data () {
      return {
         list: [],
         loading: false,
         finished: false,
         page:1,
         error:false
      };
   },

   components: {},

   props: {
      searchText:{
         required:true,
         type:String
      }
   },

   computed: {},

   methods: {
      async onLoad() {
         try{
            // 1.请求获取数据
            const {data} = await getSearchResults({
               page:this.page,
               per_page:10,
               q:this.searchText
            })
            const {results} = data.data

            // 2.将数据添加进列表
            this.list.push(...results)

            // 3.将本次加载的loading关闭
            this.loading = false

            // 4.判断是否还有数据，有则页码增加，没有则设置finished
            if(results.length){
               this.page++
            }
            else{
               this.finished=true
            }
         }
         catch(err){
            this.err=true
            this.loading = false
         }
    },
   },

   created () {},

   watch: {},


}
</script>
<style lang='less' scoped>

</style>