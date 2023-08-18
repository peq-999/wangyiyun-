<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
import {getBanner }from '@/request/api/home.js'
import { onMounted,reactive } from 'vue';
export default {
    setup() {
        const state = reactive({
            images: ['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
                'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',]
        });
        onMounted(async()=>{
            let res = await getBanner();
            state.images=res.data.banners
            console.log(res)
        })
        return { state};
    },
};
</script>
<style lang="less" >
#swiperTop {

    //最外层加了一个div盒子 方便后期的样式调整
    .van-swipe {
        width: 100%;
        padding: 0.2rem;

        .van-swipe-item {
            padding: 0 .2rem;

            img {
                width: 100%;
                height: 3rem;
                border-radius: 0.2rem;
            }
        }

        .van-swipe__indicator--active {
            background-color: rgb(219, 130, 130);
        }

    }
}</style>