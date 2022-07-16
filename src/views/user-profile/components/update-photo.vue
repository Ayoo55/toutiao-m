<template>
    <div class="update-photo">
        <img :src="img" class="img" ref="img">
        <div class="toolbar">
            <div class="cancel" @click="$emit('close')">取消</div>
            <div class="confirm" @click="onConfirm">完成</div>
        </div>

    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import {updateUserPhoto} from '@/api/user'
export default {

    name: 'UpdatePhoto',

    data () {
        return {
            cropper:null
        };
    },

    components: {},

    props: {
        img:{
            type:[String,Object],
            required:true
        }
    },

    computed: {},

    methods: {
        onConfirm(){
            // 基于服务端， getData方法，得到裁剪参数
            // console.log(this.cropper.getData());

            // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
            this.cropper.getCroppedCanvas().toBlob(
                async blob => {
                    // console.log(blob)
                    const formData = new FormData();
                    formData.append('photo', blob);

                    const {data} = await updateUserPhoto(formData)
                    console.log(data);
                    // 关闭弹层
                    this.$emit('close')

                    // 更新视图
                    this.$emit('update-photo',data.data.photo)
                }
            )
        }
    },

    created () {
    },

    watch: {},

    mounted(){
        const image = this.$refs.img
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
        })
    }


}
</script>
<style lang='less' scoped>
.update-photo{
    background-color: #000;
    height: 100%;
    .toolbar{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display:flex;
        justify-content: space-between;

        .cancel, .confirm{
            width: 80px;
            height: 80px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color:#fff
        }
    }
}
.img{
    display: block;
    max-width: 100%;
}
</style>