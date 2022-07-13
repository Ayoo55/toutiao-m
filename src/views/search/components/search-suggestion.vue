<template>
   <div class="search-suggestin">
       <!-- 联想建议 -->
      <van-cell 
      icon="search"
      v-for="(suggest,index) in suggestions" :key="index"
      @click="$emit('search',suggest)"
      >
         <div slot="title" v-html="highlight(suggest)"></div>
      </van-cell>

   </div>
</template>

<script>
import {getSearchSuggestions} from '@/api/search'
import {debounce} from 'loadsh'
export default {

   name: 'SearchSuggestion',

   data () {
      return {
         suggestions:[],
         text:`<h1>a</h1>`
      };
   },

   components: {},

   props: {
      searchText:{
         type:String,
         required:true
      }
   },

   computed: {},

   methods: {
      // 搜索建议
      async loadSearchSuggestions(q){
         try{
            const {data:{data}} = await getSearchSuggestions(q)
            this.suggestions = data.options
         }
         catch(err){
            console.log('请求数据失败');
         }
      },
      // 处理高亮
      highlight(text){
         // 替换文本
         const highlightStr = `<span class="active">${this.searchText}</span>`
         // 动态正则
         const reg = new RegExp(this.searchText,'gi')
         // 替换字符串
         return text.replace(reg,highlightStr)
      }
   },

   created () {},

   watch: {
      searchText:{
         handler:debounce(function(val){
            this.loadSearchSuggestions(val)
         },200),
         // ,handler(val){
         // }
         immediate:true
      }
   },


}
</script>
<style lang='less' scoped>
.search-suggestin{
   /deep/span.active{
      color:#3296fa
   }
}
</style>