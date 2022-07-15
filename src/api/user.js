import request from "@/utils/request"

// 封装登录的请求方法
export const login = data => {
    return request({
        url:'/v1_0/authorizations',
        method:'post',
        data
    })
}

// 发送手机验证码
export const sendSms = mobile => {
    return request({
        url:`/v1_0/sms/codes/${mobile}`,
        method:'get'
    })
}

// 获取用户个人信息
export const getUserInfo = () => {
    return request({
        url:`/v1_0/user`,
        method:'get',
        // headers:{Authorization:`Bearer ${store.state.user.token}`}
    })
}


// 获取用户的频道
export const getUserChannels = () => {
    return request({
        url:`/v1_0/user/channels`,
        method:'get',
        // headers:{Authorization:`Bearer ${store.state.user.token}`}
    })
}

// 关注用户
export const addFollow = (target) => {
    return request({
        url:`/v1_0/user/followings`,
        method:'post',
        data:{
            target
        }
    })
}

// 取消关注用户
export const deleteFollow = (target) => {
    return request({
        url:`/v1_0/user/followings/${target}`,
        method:'delete',
        
    })
}

// 获取用户信息
export const getUserProfile = () => {
    return request({
        url:`/v1_0/user/profile`,
        method:'get',
    })
}

// 编辑用户个人资料
export const updateUserProfile = data => {
    return request({
        url:'/v1_0/user/profile',
        method:'patch',
        data
    })
}