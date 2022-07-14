import request from "@/utils/request"

// 获取文章评论列表
export const getComments = params =>{
    return request({
        url:'/v1_0/comments',
        method:'get',
        params
    })
}