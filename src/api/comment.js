import request from "@/utils/request"

// 获取文章评论列表
export const getComments = params =>{
    return request({
        url:'/v1_0/comments',
        method:'get',
        params
    })
}

// 对评论点赞
export const addCommentLike = target =>{
    return request({
        url:'/v1_0/comment/likings',
        method:'post',
        data:{
            target
        }
    })
}

// 取消评论点赞
export const deleteCommentLike = target =>{
    return request({
        url:`/v1_0/comment/likings/${target}`,
        method:'delete',
        
    })
}


// 对文章或者评论进行评论
export const addComment = data =>{
    return request({
        url:`/v1_0/comments`,
        method:'post',
        data
    })
}