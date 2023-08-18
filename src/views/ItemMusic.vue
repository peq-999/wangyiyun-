<template>
    <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
    <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
    
</template>
<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getMusicItemList,getItemList } from '@/request/api/item';
import ItemMusicTop from '@/components/item/itemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue';
export default{
    setup(){
        const state = reactive({
            playlist:{}, //歌单的详情页的数据
            itemList:[]   //歌单的歌曲
        });
        onMounted(async()=>{
            let id=useRoute().query.id
            console.log(id);
            //获取歌单详情页
            let res= await getMusicItemList(id);
            console.log(res);
            state.playlist=res.data.playlist;
            //获取歌单的歌曲
            let result = await getItemList(id)
            console.log(result)
            state.itemList = result.data.songs
            //防止页面刷新，数据丢失
            sessionStorage.setItem('itemDatail',JSON.stringify(state))
        });
        return {state};

    },
    components:{
        ItemMusicTop,
        ItemMusicList,
        
    }
}
</script>