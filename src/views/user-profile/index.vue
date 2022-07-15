<template>
    <div class="user-profile">
        <!-- 导航栏 -->
        <van-nav-bar
            title="个人信息"
            left-arrow
            @click-left="$router.back()" 
        />
        <!-- 导航栏 -->

        <!-- 个人信息 -->
        <van-cell title="头像" is-link>
            <van-image
                class="avator"

                fit="cover"
                round
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
        </van-cell>

        <van-cell title="昵称" :value="profile.name" is-link @click="isUpdateNameShow=true"/>
        <van-cell title="性别" :value="profile.gender===0 ? '男' : '女'" is-link @click="isUpdateGenderShow=true"/>
        <van-cell title="生日" :value="profile.birthday" is-link/>

        <!-- 个人信息 -->

        <!-- 弹出层 -->
        <!-- 编辑昵称 -->
        <van-popup 
            v-model="isUpdateNameShow" 
            position="bottom" 
            :style="{ height: '100%' }" 
        >
            <UpdateName 
                v-if="isUpdateNameShow"
                @close="isUpdateNameShow=false"
                v-model="profile.name"
            ></UpdateName>
        </van-popup>

        <!-- 编辑性别 -->
        <van-popup 
            v-model="isUpdateGenderShow" 
            position="bottom" 
        >
            <UpdateGender 
            v-if="isUpdateGenderShow"
            @close="isUpdateGenderShow=false"
            v-model="profile.gender"
            ></UpdateGender>
        </van-popup>
        <!-- 弹出层 -->

    </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
export default {

    name: 'UserProfile',

    data () {
        return {
            profile:{},
            isUpdateNameShow:false,   //昵称弹出层的显示隐藏
            isUpdateGenderShow:false
        };
    },

    components: {
        UpdateName,
        UpdateGender
    },

    props: {},

    computed: {},

    methods: {
        async onLoadProfile(){
            try{
                const {data:{data}} = await getUserProfile()
                this.profile = data
                console.log(this.profile);
            }
            catch(err){
                this.$toast("获取用户信息失败，请稍后重试");
            }
        }
    },

    created () {
        this.onLoadProfile()
    },

    watch: {},


}
</script>
<style lang='less' scoped>
.user-profile{
    .avator{
        width: 60px;
        height: 60px;
    }
    .van-popup{
        background-color: #f5f7f9;
    }
}
</style>