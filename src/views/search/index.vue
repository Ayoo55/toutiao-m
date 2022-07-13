<!-- 搜索页面 -->
<template>
   <div class="search-container">
        <form action="/" class="search-form">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
                @focus="isResultShow=false"
                background="#3296fa"
                
            />
        </form>
        
        <!-- 搜索结果 -->
        <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
        <!-- 搜索建议 -->
        <SearchSuggestion v-else-if="searchText" :searchText="searchText" @search="onSearch"></SearchSuggestion>
        <!-- 搜索历史 -->
        <SearchHistory v-else :searchHistory="searchHistory" @clearSearchHistory="searchHistory=[]" @search="onSearch"></SearchHistory>
   </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { getItem,setItem } from '@/utils/storage'
export default {

    name: 'SearchIndex',

    data () {
        return {
            searchText:'',
            isResultShow:false,
            searchHistory: getItem('TOUTIAO_SEARCH_HISTORY') || []
        };
    },

    components: {
        SearchHistory,
        SearchResult,
        SearchSuggestion
    },

    props: {},

    computed: {},

    methods: {
        // 搜索内容
        onSearch(val){
            this.isResultShow = true
            
            // 数据的 indexOf 方法，可以遍历数组，有则返回相应的索引，无则返回-1
            const index = this.searchHistory.indexOf(val)
            if(index !== -1){
                this.searchHistory.splice(index,1)
            }
            this.searchHistory.unshift(val)

            this.searchText = val
        },
        onCancel(){
            this.$router.back()
        },
       
       
    },

    created() {},

    watch: {
        searchHistory:{
            handler(val){
                setItem('TOUTIAO_SEARCH_HISTORY',val)
            }
        }
    },


}
</script>

<style lang='less' scoped>
.search-container{
    padding-top: 108px;
    .van-search__action{
        color: #fff;
    }
    .search-form{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1;
        
    }
}
</style>