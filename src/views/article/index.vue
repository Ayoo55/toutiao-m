<!-- 文章内容路由组件 -->
<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">

      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
            <van-image
                class="avatar"
                slot="icon"
                round
                fit="cover"
                :src="article.aut_photo"
            />
            <div slot="title" class="user-name">{{article.aut_name}}</div>
            <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
            
            <!-- 
                :isFollowed="article.is_followed"
                @up
                用 v-model 替换
            -->

            <FollowUser 
            class="follow-btn"
            :userId="article.aut_id"
            v-model="article.is_followed"
            ></FollowUser>
            <!-- 已关注 is_followed 为 true -->
            <!-- <van-button
                v-if="article.is_followed"
                class="follow-btn"
                round
                size="small"
                @click="onFollow"
                :loading="followLoading"
            >已关注</van-button> -->

            <!-- 未关注 -->
            <!-- <van-button
                v-else
                class="follow-btn"
                type="info"
                color="#3296fa"
                round
                size="small"
                icon="plus"
                @click="onFollow"
                :loading="followLoading"
            >关注</van-button> -->
          
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div 
        class="article-content markdown-body" 
        v-html="article.content"
        ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论 -->
        <CommentList 
            :source="article.art_id"
            @onload-success="totalCommentCount=$event.total_count"
            :list="commentList"
            @reply-click="onReplyShow"
        ></CommentList>
        <!-- 文章评论 -->


         <!-- 底部区域 -->
        <div class="article-bottom">
            <van-button
                class="comment-btn"
                type="default"
                round
                size="small"
                @click="isPostShow=true"
            >写评论</van-button>
            <van-icon
                name="comment-o"
                :badge="totalCommentCount"
                color="#777"
            />
            <!-- <van-icon
                color="#777"
                name="star-o"
            /> -->
            <CollectArticle v-model="article.is_collected" 
            :articleId="article.art_id"></CollectArticle>

            <!-- <van-icon
                color="#777"
                name="good-job-o"
            /> -->
            <LikeArticle v-model="article.attitude" 
            :articleId="article.art_id"></LikeArticle>
            <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论 -->
        <van-popup 
            v-model="isPostShow" 
            position="bottom"  
        >
            <!-- 评论组件 -->
            <CommentPost 
                :target="article.art_id"
                @onPost="onPostSuccess"
            ></CommentPost>
        </van-popup>
        <!-- 发布评论 -->

      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus===404"> 
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 评论回复弹层 -->
        <van-popup 
            v-model="isReplyShow" 
            position="bottom" 
            style="height:100%" 
        >
          <CommentReply 
            v-if="isReplyShow"
            :comment="currentComment"
            @close="isReplyShow=false"
          ></CommentReply>
        </van-popup>
    <!-- 评论回复弹层 -->
   
  </div>
</template>

<script>
import {getArticlesById} from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-item'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'

export default {
    name: 'ArticleIndex',
    components: {
        FollowUser,
        CollectArticle,
        LikeArticle,
        CommentList,
        CommentPost,
        CommentReply
    },
    provide:function(){
        return {
            articleId : this.articleId
        }
        
    },
    props: {
        articleId: {
        type: [Number, String],
        required: true
        }
    },
    data () {
        return {
            article:{},
            loading:true,
            errStatus:0,
            totalCommentCount:0,
            isPostShow:false,
            isReplyShow:false,
            commentList:[],
            currentComment:{} //当前评论
            
        }
    },
    computed: {},
    watch: {},
    created () {
        this.loadArticle()
    },
    mounted () {},
    methods: {
        // 加载文章内容
        async loadArticle(){
            // 处于加载状态
            this.loading = true
            try{
                const {data} = await getArticlesById(this.articleId)
                console.log(data);
                // if(Math.random()>0.5){
                //     JSON.parse('alksdagioj')
                // }

                this.article = data.data

                setTimeout(()=>{
                    this.previewImage()
                },0)
                
            }
            catch(err){
                // 判断err类型
                if(err.response && err.response.status === 404){
                    this.errStatus = 404
                }
                console.log('获取数据失败',err);
            }
            this.loading = false

        },
        
        // 点击图片预览
        previewImage(){
            // 获取DOM节点
            const articleContent = this.$refs['article-content']
            // 获取所有 img  节点
            const imgs = articleContent.querySelectorAll('img')
            // 空数组储存 img 的地址
            const images = []
            // 遍历 img 节点，得到 img 的地址，添加到数组中
            imgs.forEach((img,index) => {
                images.push(img.src)
                // 遍历图片的同时，完成图片点击事件，增加图片预览效果
                img.onclick = ()=>{
                    ImagePreview({
                        images,
                        startPosition: index,
                    });
                }
            });
        
        },

        // 关闭评论弹出层，将发布内容显示到列表顶部
        onPostSuccess(data){
            this.isPostShow = false
            this.commentList.unshift(data.new_obj)

        },

        // 点击“回复”，显示弹层
        onReplyShow(data){
            console.log(data);
            this.currentComment = data
            this.isReplyShow = true
        }
    }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    /deep/.van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>

