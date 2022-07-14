import request from "@/utils/request"

// 获取文章列表
export const getArticles = params =>{
    return request({
        url:'/v1_0/articles',
        method:'get',
        params
    })
}

// 获取文章内容
export const getArticlesById = articleId =>{
    return request({
        url:`/v1_0/articles/${articleId}`,
        method:'get',
    })
}

// 添加收藏
export const addCollect = target =>{
    return request({
        url:`/v1_0/article/collections`,
        method:'post',
        data:{
            target
        }
    })
}

// 取消收藏
export const deleteCollect = target =>{
    return request({
        url:`/v1_0/article/collections/${target}`,
        method:'delete',
    })
}

// 点赞
export const addLike = target =>{
    return request({
        url:`/v1_0/article/likings`,
        method:'post',
        data:{
            target
        }
    })
}

// 取消点赞
export const deleteLike = target =>{
    return request({
        url:`/v1_0/article/likings/${target}`,
        method:'delete'
    })
}