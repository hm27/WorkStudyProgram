<template>
    <div>
        <div class="banner block">
            <el-carousel height="250px" :interval="50000">
                <el-carousel-item v-for="item in lunBoList" >
                   <div class="lunbo">
                       <img :src="item.picConent | imgUrl" alt="">
                   </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="content">
            <div class="snews">
                <div></div>
                <div>缤纷校园</div>
                <div class="new-con" v-for="item in newsList">
                    <h4>{{item.picTitle}}</h4>
                    <img :src="item.picConent | imgUrl" alt="">
                    <div >{{item.picDetail}}</div>
                </div>
            </div>
            <div class="work">
                <div class="aWork">
                    <allWork></allWork>
                </div>
                <div class="hWork">
                    <HourWork></HourWork>
                </div>
            </div>
        </div>
        <div class="foot">
                勤工助学管理系统
        </div>
    </div>
</template>

<script>
    import css from '../../static/main.css'
    import allWork from './allWork'
    import HourWork from './hourWork'
    export default {
        name: "main",
        data(){
            return{
                lunBoList:[],
                newsList:[]
            }
        },
        components:{
            allWork,
            HourWork
        },
        methods:{
            getLunBoPic(){
                this.$ajax.get("/getLunBoPic")
                    .then(data=>{
                        if(data.ok===1){
                            this.lunBoList = data.lunBoInfo
                        }
                    })
            },
            getNewsList(){/*获取新闻列表*/
                this.$ajax.get("/getNewsList")
                    .then(data=>{
                        if(data.ok === 1){
                            this.newsList = data.newsInfo;
                        }
                    })
            }
        },
        mounted(){
            this.getLunBoPic();
            this.getNewsList();
        }
    }
</script>

<style scoped>
    .new-con{
        width: 250px;
        /*height:250px ;*/
        /*background: #f00;*/
        clear: both;
        margin: auto;
        border-bottom: 1px solid #eaeaea;
        margin-bottom: 8px;
    }
    .new-con h4{
        height: 37px;
        color: #000;
        /*background: pink;*/
        line-height: 37px;
        text-indent: 9px;
    }
    .new-con img{
        width:220px;
        height: 170px;
        display: block;
        margin: auto;
    }
    .new-con div{
        text-indent: 28px;
        line-height: 24px;
    }
</style>
