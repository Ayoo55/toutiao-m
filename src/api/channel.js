import request from "@/utils/request";

export const getAllChannels = () =>{
    return request({
        url:'/v1_0/channels',
        method:'get',
    })
}