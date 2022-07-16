<template>
    <div class="user-profile">
        <!-- 导航栏 -->
        <van-nav-bar
            title="个人信息"
            left-arrow
            @click-left="$router.back()" 
        />
        <!-- 导航栏 -->

        <!-- 上传文件 -->
        <input type="file" hidden ref="file" @change="onFileChange">

        <!-- 个人信息 -->
        <van-cell title="头像" is-link @click="$refs.file.click()">
            <van-image
                class="avator"

                fit="cover"
                round
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
        </van-cell>

        <van-cell title="昵称" :value="profile.name" is-link @click="isUpdateNameShow=true"/>
        <van-cell title="性别" :value="profile.gender===0 ? '男' : '女'" is-link @click="isUpdateGenderShow=true"/>
        <van-cell title="生日" :value="profile.birthday" is-link
        @click="isUpdateBirthdayShow=true"/>

        <!-- 个人信息 -->

        <!-- 弹出层 -->
        <!-- 编辑头像 -->
        <van-popup 
            v-model="isUpdatePhotoShow" 
            position="bottom" 
            :style="{ height: '100%' }" 
        >
            <UpdatePhoto 
                :img="img" 
                @close="isUpdatePhotoShow=false"
                @update-photo="profile.photo=$event"
            ></UpdatePhoto>
        </van-popup>
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

        <!-- 编辑生日 -->
        <van-popup 
            v-if="isUpdateBirthdayShow"
            v-model="isUpdateBirthdayShow" 
            position="bottom" 
        >
            <UpdateBirthday 
                v-model="profile.birthday"
                @close="isUpdateBirthdayShow=false"
            ></UpdateBirthday>
        </van-popup>

        <!-- 弹出层 -->

    </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {

    name: 'UserProfile',

    data () {
        return {
            profile:{},
            isUpdateNameShow:false,   //昵称弹出层的显示隐藏
            isUpdateGenderShow:false,
            isUpdateBirthdayShow:false,
            isUpdatePhotoShow:false,
            img:null
        };
    },

    components: {
        UpdateName,
        UpdateGender,
        UpdateBirthday,
        UpdatePhoto
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
        },

        // 文件更新
        onFileChange(){
            console.log(this.profile.photo);
            // 获取文件对象
            const file = this.$refs.file.files[0]
            // 基于文章对象获取 blob 数据，得到一个http格式的url路径
            this.img = window.URL.createObjectURL(file)
            this.isUpdatePhotoShow = true
            this.$refs.file.value=''
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