<!-- 文章内容组件 -->
<template>
    <van-cell-group>
        <van-cell  class="article-item" :to="{
            name:'article',
            params:{
                articleId:article.art_id
            }
        }">
            <div slot="title" class="title van-multi-ellipsis--l2" >{{article.title}}</div>

            <div slot="label">
                <div class="cover-wrap" v-if="article.cover.type === 3">
                    <div 
                    class="cover-item" v-for="(img,index) in article.cover.images" :key="index">
                         <van-image
                            fit="cover"
                            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                            
                            class="cover-item-img"
                        />
                        <!-- :src="img" -->
                    </div>
                </div>
                
                <div class="label-info-wrap">
                    <span>{{article.aut_name}}</span>
                    <span>{{article.comm_count}}评论</span>
                    <span>{{article.pubdate | relativeTime}}</span>
                </div>
            </div>

            <van-image
            v-if="article.cover.type === 1"
            slot="default"
            class="right-cover"
            fit="cover"
            
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
            <!-- :src="article.cover.images[0]" -->

        </van-cell>
    </van-cell-group>
</template>

<script>
export default {
    name:'ArticleItem',
    props:{
        article:{
            required:true,
            type:Object
        }
    },
  
}
</script>

<style scoped lang="less">
.article-item{
    .title{
        font-size: 32px;
        color:#3a3a3a;
    }
    .van-cell__value{
        flex:unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;
        .right-cove{
            width: 232px;
            height: 146px;
        }
    }

    .label-info-wrap span{
        font-size: 22px;
        color:#b4b4b4;
        margin-right: 25px;
    }

    .cover-wrap{
        display: flex;
        padding: 30px 0;
        .cover-item{
            flex: 1;
            height: 146px;
            &:not(:last-child){
                margin-right: 4px;
            }
            .cover-item-img{
                width: 100%;
                height: 146px;

            }
        }
    }
}

</style>