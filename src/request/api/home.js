import service from "..";

//获取首页轮播图数据
export function getBanner(){
    return service({
        method:'GET',
        url:'/banner?type=2', //type=2为iphone端
    })

}

//获取发现好歌单
export function getMusicList(){
    return service({
        method:'GET',
        url:'/personalized?limit=10'   //获取10首歌
    })
}

//获取 搜索 数据
export function getSearchMusic(data){
    return service({
        method:'GET',
        url:`/search?keywords=${data}`
    })
}

//登录/login/cellphone?phone=xxx&password=yyy
export function getPhoneLogin(data){
    return service({
        method:'GET',
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}


//获取用户详情
export function getLoginUser(data){
    return service({
        method:'GET',
        url:`/user/detail?uid=${data}`
    })
}