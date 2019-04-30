<template>
    <div class="work-wrap">
        <div class="news" v-for="item in newsList">
            <div class="news-left">
                <h3>{{item.picTitle}}</h3>
                <img :src="item.picConent | imgUrl" alt="">
            </div>
            <div class="news-right">{{item.picDetail}}</div>
            <div class="news-time">{{item.addTime | date}}</div>
        </div>
        <div class="foot">
            勤工助学管理系统
        </div>
    </div>
</template>

<script>
    export default {
        name: "newsList",
        data(){
            return{
                newsList:[]
            }
        },
        methods:{
            getQNewsList(){/*前端获取新闻列表*/
                this.$ajax.get("/getQNewsList")
                    .then(data=>{
                        if(data.ok === 1){
                            this.newsList = data.newsInfo
                        }
                    })
            }
        },
        mounted(){
            this.getQNewsList();
        }
    }
</script>

<style scoped>
    .work-wrap{
        width: 950px;
        margin: auto;
        background: #fff;
    }
    .news{
        width: 950px;
        background: #fff;
        height: 200px;
        border-top: 1px solid #eaeaea;
        margin-bottom: 5px;
    }
    .news-left{
        width: 290px;
        height: 200px;
        float: left;
    }
    .news-left h3{
        height: 40px;
        line-height: 40px;
        text-indent: 35px;
    }
    .news-left img{
        width: 230px;
        height: 160px;
        display: block;
        margin: auto;
    }
    .news-right{
        width: 360px;
        height: 160px;
        float: left;
        padding-top: 40px;
        text-indent: 28px;
        line-height: 24px;
        color: #000;
        font-size: 14px;
    }
    .news-time{
        float: right;
        line-height: 200px;
        font-size: 18px;
        padding-right: 20px;
    }
</style>
