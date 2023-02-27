export default {
    namespaced:true,
    state:{
        title:'添加',
        goodsData:{}
    },
    mutations:{
        changeTitle(state,payload){
            state.title = payload;
        },
        changeGoods(state,payload){
            state.goodsData = payload;
        }
    }
}