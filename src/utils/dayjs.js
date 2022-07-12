import dayjs from "dayjs";
import Vue from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') 

Vue.filter('relativeTime',value => {
    return dayjs().to(dayjs(value))
})
