import request from "@/utils/request";

export const getAllChannels = () =>{
    return request({
        url:'/v1_0/channels',
        method:'get',
    })
}

export const addUserChannel = (channels) =>{
    return request({
        url:'/v1_0/user/channels',
        method:'patch',
        data:{
            channels
        }
    })
}

export const deleteUserChannel = (channelId) =>{
    return request({
        url:`/v1_0/user/channels/${channelId}`,
        method:'delete',
    })
}