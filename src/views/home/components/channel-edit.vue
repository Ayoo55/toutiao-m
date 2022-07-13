<!-- 弹出层内容组件 -->

<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button 
      type="danger" 
      plain size="mini" 
      round 
      class="edit-btn"
      @click="isEdit = !isEdit"
      > 
       {{isEdit ? "完成": "编辑" }}
      </van-button>
    </van-cell>
    <!-- 频道内容 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item 
      class="grid-item" 
      v-for="(value,index) in myChannels" :key="index"
      @click="onMyChannelClick(value,index)"
      >
        <van-icon 
        slot="icon" 
        name="clear"
        v-show="isEdit && !fiexChannels.includes(value.id)" 
        >
        <!-- 在我的频道中的ID，不包含在固定数组内容，则显示 -->
        </van-icon>

        <span class="text" slot="text" :class="{active:active===index}">{{value.name}}</span>
      </van-grid-item>
     
    </van-grid>


    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 频道内容 -->
    <van-grid class="recommand-grid" :gutter="10">
      <van-grid-item 
      :text="value.name" 
      class="grid-item" 
      icon="plus" 
      v-for="(value,index) in recommendChannels" :key="index"
      @click="onAddChannel(value)"
      />
    </van-grid>


  </div>
</template>

<script>
import {getAllChannels,addUserChannel,deleteUserChannel} from '@/api/channel'
import { mapState } from 'vuex'
import {setItem} from '@/utils/storage'
export default {
  name:'channelEdit',
  props:{
    myChannels:{
      required:true,
      type:Array
    },
    active:{
      required:true,
      type:Number
    }
  },
  created(){
    // 调用获取所有频道函数
    this.loadAllChannels()
  },
  methods: {
    // 获取所有频道函数
    async loadAllChannels(){
      try{
        const {data:{data}} = await getAllChannels()
        this.allChannels = data.channels
        console.log(this.allChannels[0]);
      }
      catch(err){
        this.$toast('数据获取失败')
      }
    },

    // 点击频道推荐，添加到我的频道
    async onAddChannel(channel){
      this.myChannels.push(channel)

      // 数据持久化处理
      if(this.user){
      // 已登录，把数据请求接口放到线上
        try{
          await addUserChannel([{
            id:channel.id,
            seq:this.myChannels.length
          }])
        }
        catch(err){
          console.log("获取频道数据失败");
        }
      }
      else{     
        // 未登录，把数据储存到本地
        setItem('TOUTIAO_CHANNELS',this.myChannels)

      }
    },

    // 删除频道持久化
    async deleteChannel(channel){
      try{
        if(this.user){
          // 已登录
          await deleteUserChannel(channel.id)
        }
        else{
          setItem('TOUTIAO_CHANNELS',this.myChannels)
        }
      }
      catch(err){
        console.log('操作失败，请稍后重试');
      }
      
    },

    // 点击我的频道
    onMyChannelClick(value,index){
      if(this.isEdit){
        // 删除频道
        // 1.如果是固定频道，则不删除
        if(this.fiexChannels.includes(value.id)){
          return
        }
        // 2.删除频道项
        // 3.更新激活的频道项，如果删除的是频道项之前的，则active-1
        this.myChannels.splice(index,1)

        if(this.active > index ){
          this.$emit("updateActive",this.active-1,true)
        }

        // 4.处理持久化
        this.deleteChannel(value)
      }
      else{
        // 切换频道,active改变
        this.$emit("updateActive",index,false)
      }
    }
  },
  data(){
    return{
      allChannels:[],
      isEdit:false,//控制关闭按钮的显示状态
      fiexChannels:[0] //固定频道，不允许删除
    }
  },
  computed:{
    recommendChannels(){
      const channels = []
      this.allChannels.forEach(channel => {
        // find 遍历数组，找到满足条件的元素项
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        
        if(!ret){
          channels.push(channel)
        }
      })

      // 计算属性，要return结果
      return channels
    },
    ...mapState(['user'])
    

    /*
    recommendChannels(){
      return this.allChannels.filter(channle => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channle.id
        })
      })
    }
   */
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  padding-top: 85px;

  .title-text{
    font-size: 32px;
    color: #333;
  }

  .edit-btn{
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  .grid-item{
    width: 160px;
    height: 86px;
    padding-right: 0;
    /deep/ .van-grid-item__content{
      background-color: #f4f5f6;
      white-space: nowrap;
        /deep/ .van-grid-item__icon-wrapper{
          position: absolute;
        }
        
        .van-grid-item__text , .text{
          color: #222;
          font-size: 28px;
          margin-top: 0;
        }

        .active{
          color: red;
        }
    }
  }

  

  /deep/ .my-grid{
    
    .van-grid-item__icon-wrapper{
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
    }

    
     
   
  }

  /deep/.recommand-grid{
    .grid-item{
      .van-grid-item__content{
        flex-direction: row;

        .van-icon-plus{
          font-size: 24px;
          margin-right: 6px;
        }

        
      }
    }
  }

}
</style>
