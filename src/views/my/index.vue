<template>
  <div class="my-container">

    <!-- 用户信息 -->
    <div class="header user-info" v-if="user">
      <!-- 用户基础信息 -->
      <div class="base-info">
        <div class="left">
          <van-image
          fit="cover"
          :src="userInfo.photo"
          class="avatar"
          round
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>

      <!-- 用户账号数据 -->
      <div class="data-stats" >
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 点击登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" class="mobile-img" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    

    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item icon="photo-o" text="文字" class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字" class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    
    <!-- 消息通知、小智同学、退出登录 -->
    <div class="message">
      <van-cell title="消息通知" isLink class="notification"/>
      <van-cell title="小智同学"  isLink/>
      <van-cell title="退出登录" class="exit-btn" v-if="user" @click="onLogout" clickable/>
    </div>
    


  </div>
</template>

<script>
import {mapState} from 'vuex'
// 加载获取用户个人信息的模块
import {getUserInfo} from '@/api/user.js'
export default {
    name:'MyIndex',
    data(){
      return{
        userInfo:{} //用户信息
      }
    },
    created(){
      // 如果用户登录了，则请求加载用户信息数据
      if(this.$store.state.user){
        // 调用方法
        this.loadUserInfo()
      }
      
    },
    computed:{
      ...mapState(['user'])
    },
    methods:{
      onLogout(){
        this.$dialog.confirm({
          title: '确认退出吗？',
        })
          .then(() => {
            this.$store.commit('setUser',null)
          })
          .catch(() => {
            // on cancel
          });
      },
      async loadUserInfo(){
        try{
          const {data:{data}} = await getUserInfo()
          this.userInfo = data
        }
        catch(err){
          this.$toast('获取数据失败，请稍后重试')
        }
      }
    }
}
</script>

<style lang="less">
.my-container{
  .header{
    background: url('~@/assets/banner.png') ;
    background-size: cover;
    height: 361px;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img{
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text{
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info{
    .base-info{
      height: 231px;
      padding: 76px 32px 23px;

      box-sizing: border-box; //盒子模型不用因为padding撑大

      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .avatar{
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border:4px solid #fff
        }
        .name{
          font-size: 30px;
          color: #fff;
        }
      }
    }

    .data-stats{
      height: 130px;
      display: flex;
      .data-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;

        .count{
          font-size: 36px;
        }
        .text{
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav{
    .grid-item{
      height: 141px;

      i.toutiao{
        font-size: 45px;
      }
      .toutiao-shoucang{
          color: #eb5253;
        }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      span.text{
        font-size: 28px;
      }
    }
  }

  .message{
    .notification{
    margin-top: 9px;
  }

    .exit-btn{
      text-align: center;
      color: #d86262;
      margin-top: 9px;
    }
  }
}
</style>