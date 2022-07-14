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