<!-- 首页组件 -->
<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar  class="page-nav-bar" fixed>
      <van-button slot="title" round size="small" icon="search" type="info" class="search-btn">搜索</van-button>
    </van-nav-bar>

    <!-- 标签栏  scrollspy -->
    <van-tabs class="channel-tabs" v-model="active" animated >  
      <van-tab 
      :title="obj.name"
      v-for="obj in channels" :key="obj.id"
      >
        <ArticleList :channel="obj"></ArticleList>
      </van-tab>
      
      <div slot="nav-right" class="placehoder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom" 
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <ChannelEdit 
      :myChannels="channels" 
      :active="active"
      @updateActive="onUpdateActive"
      ></ChannelEdit>
    </van-popup>




  </div>
</template>

<script>
import {getUserChannels} from '@/api/user.js'
import ArticleList from '@/views/home/components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
    name:'HomeIndex',
    data() {
      return {
        active: 0,
        channels:[],
        isChannelEditShow:false
      }
    },
    created(){
      this.loadChannels()
    },
    methods:{
      async loadChannels(){
        try{
          // const{data} = await getUserChannels()
          // this.channels = data.data.channels

          // 已登录请求获取用户频道列表

          let channels = [ ]
          if(this.user){
            const{data} = await getUserChannels()
            channels = data.data.channels
          }
          

          // 未登录
          else{
            const localChannels = getItem('TOUTIAO_CHANNELS')
            if(localChannels){
              channels = localChannels
            }
            else{
              const{data} = await getUserChannels()
              channels = data.data.channels
            }
          }
          this.channels = channels
        }
        
        catch(err){
          this.$toast('获取用户频道失败')
        }
      },
      onUpdateActive(index,isChannelEditShow=true){
        this.active = index
        this.isChannelEditShow=isChannelEditShow
      }
    },
    components:{
      ArticleList,
      ChannelEdit
    },
    computed:{
      ...mapState(['user'])
    }
}
</script>

<style scoped lang="less">
.home-container{
  padding-top: 170px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title{
    max-width: unset;
  }
  .search-btn{
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon{
      font-size: 32px;
      color: #fff
    }
  }

  .channel-tabs{
    /deep/ .van-tab{
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }

    .van-tab--active{
      color: #333;
    }
    /deep/ .van-tabs__wrap{
      height: 82px;
      position: fixed;
      top: 92px;
      z-index:1;
      left: 0;
      right: 0;
      

    }

    /deep/ .van-tabs__nav{
      padding-bottom: 0;
    }

    /deep/ .van-tabs__line{
      width: 31px;
      height: 6px;
      background-color:#3296fa;
      bottom: 8px;
    }
    
    .hamburger-btn{
      position: fixed;
      right:0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao{
        font-size: 33px;
      }
      &:before{
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
        
      }
    }

    .placehoder{
      width: 1px;
      height: 100%;
      // 不参与空间计算
      flex-shrink: 0;
    }
  }

  
}
</style>