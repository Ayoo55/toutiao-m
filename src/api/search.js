import request from "@/utils/request";

export const getSearchSuggestions = (q) => {
    return request({
        url:'/v1_0/suggestion',
        method:'get',
        params:{
            q
        }
    })
}

export const getSearchResults = (params) => {
    return request({
        url:'/v1_0/search',
        method:'get',
        params
    })
}