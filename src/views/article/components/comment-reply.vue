<!-- 评论回复组件 -->
<template>
    <div class="comment-reply">
        <!-- 回复顶部 -->
        <van-nav-bar
            :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
        >
            <van-icon 
                slot="left" 
                name="cross"
                @click="$emit('close')"
            ></van-icon>
        </van-nav-bar>

        <div class="scroll-wrap">
            <!-- 当前评论项 -->
            <commentItem :comment="comment"></commentItem>
            <!-- 当前评论项 -->

            <!-- 评论的回复列表 -->
            <van-cell title="全部回复"  />
            <commentList 
                :source="comment.com_id"
                type="c"
                :list="commentList"
            ></commentList>
            <!-- 评论的回复列表 -->
        </div>

        <!-- 写评论 -->
         <div class="post-wrap">
            <van-button 
                class="post-btn" 
                size="small" 
                round
                @click="isPostShow=true"
            >写评论</van-button>
        </div>
        <!-- 写评论 -->

        

        <!-- 发布评论 -->
        <van-popup 
            v-model="isPostShow" 
            position="bottom"
        >
            <commentPost    
                :target="comment.com_id"
                :articleId="articleId"
                @onPost="onPostSuccess"
            ></commentPost>

        </van-popup>
        <!-- 发布评论 -->


    </div>
</template>

<script>
import commentItem from './comment-item.vue';
import commentList from './comment-list.vue';
import commentPost from './comment-post.vue';

export default {

    inject:{
        articleId:{
            type:[Number,String,Object],
            default: null
        }
    },

    name: 'CommentReply',

    data () {
        return {
            isPostShow:false,
            commentList:[]
        };
    },

    components: {
        commentItem,
        commentList,
        commentPost
    },

    props: {
        comment:{
            requried:true,
            type:Object
        }
    },

    computed: {},

    methods: {
        onPostSuccess(val){
            this.comment.reply_count++
            this.isPostShow = false
            this.commentList.unshift(val.new_obj)
        }
    },

    created () {},

    watch: {},


}
</script>
<style lang='less' scoped>
// 滚动容器
.scroll-wrap{
    position: fixed;
    top: 92px;
    left: 0;
    right:0;
    bottom: 88px;
    overflow-y: auto;
}
.post-wrap{
    height: 88px;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .post-btn{
        width: 60%;
    }
}
</style>