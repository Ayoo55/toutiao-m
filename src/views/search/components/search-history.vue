<template>
   <div class="search-history">
      <!-- 搜索历史 -->
      <van-cell title="搜索历史">
         <div v-if="isDeleteShow">
            <span @click="$emit('clearSearchHistory')">全部删除</span>
            &nbsp;
            <span @click="isDeleteShow=false">完成</span>
         </div>
         
         <van-icon name="delete" @click="isDeleteShow=true" v-else/>
      </van-cell>
      <van-cell 
      :title="history" v-for="(history,index) in searchHistory" :key="index"
      @click="historyClick(history,index)"
      >
         <van-icon v-show="isDeleteShow" name="close" />
      </van-cell>

      
      
     

   </div>
</template>

<script>
export default {

   name: 'SearchHistory',

   data () {
      return {
         isDeleteShow:false
      };
   },

   components: {},

   props: {
      searchHistory:{
         type:Array,
         required:true
      }
   },

   computed: {},

   methods: {
      historyClick(history,index){
         if(this.isDeleteShow){
            // 删除状态
            // props 中，数字、布尔值等只能通过父组件修改，引用类型比如数组、对象等可以修改，但不能赋值
            // this.$emit('deleteSearchHistory',index)
            this.searchHistory.splice(index,1)
         }
         else{
            // 非删除状态
            this.$emit('search',history)
         }
      }
   },

   created () {},

   watch: {},


}
</script>
<style lang='less' scoped>

</style>