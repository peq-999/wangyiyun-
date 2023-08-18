<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑可以却换上下首</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon bofang" aria-hidden="true" v-if="isbtnShow" @click="play">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-bofang4-copy-copy"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true">
                <use xlink:href="#icon-todolist"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%',width:'100%' }">
            <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"></MusicDetail>
        </van-popup >
    </div>
</template>
<script>
import MusicDetail from './MusicDetail.vue';
import { mapMutations, mapState } from 'vuex'
export default {
    data(){
        return{
            interVal:0
        }
    },
    computed: {
        ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow'])
    },
    mounted() {
        console.log(this.$refs);
        this.$store.dispatch('getLyric',this.playList[this.playListIndex].id)
        
    },
    updated(){
        this.$store.dispatch('getLyric',this.playList[this.playListIndex].id);
        this.addDuration()
    },
    methods: {
        play: function () {
            //判断音乐是否播放
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.updateIsbtnShow(false)
                this.updateTime()   //播放就调用函数进行传值
            } else {
                this.$refs.audio.pause();
                this.updateIsbtnShow(true)
                clearInterval(this.interVal)  //暂停就清除定时器
            }
        },
        addDuration:function(){
            this.updateDuration(this.$refs.audio.duration)

        },
        updateTime:function(){
            this.interVal=setInterval(()=>{
                this.updateCurrentTime(this.$refs.audio.currentTime);
            },1000);
        },
        ...mapMutations(['updateIsbtnShow', 'updateDetailShow', 'detailShow','updateCurrentTime','updateDuration'])
    },
    watch: {
        playListIndex: function () { //监听如果是下标发生了改变，就自动播放
            this.$refs.audio.autoplay = true;
            if (this.$refs.audio.paused) { //如果是暂停状态，改变图标
                this.updateIsbtnShow(false)
            }
        },
        playList: function () {
            if (this.isbtnShow) {
                this.$refs.audio.autoplay = true,
                    this.updateIsbtnShow(false)
            }
        }
    },
    components:{
        MusicDetail,
    }
}
</script>
<style lang="less" scoped>
.FooterMusic {
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;

    .footerLeft {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    }

    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
            width: 0.6rem;
            height: .6rem;
        }
    }
}
</style>