<template>
  <div id="app">
      <div class="main">
          <div class="top">
              <p>勤工助学管理系统</p>
          </div>

          <div class="nav-wrap">
              <ul class="nav">
                  <li @click="$router.push('/')">首页</li>
                  <li @click="$router.push('/allDayList')">周末工作</li>
                  <li @click="$router.push('/hourDayList')">临时工</li>
                  <li @click="$router.push('/newsList')">新闻</li>
              </ul>
              <ul class="login">
                  <li>
                      <el-dropdown>
                          <span class="el-dropdown-link">
                            欢迎回来,{{$store.state.userList.userName}}
                          </span>
                          <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item >
                                  <span @click="$router.push('/applyPost')">申请的岗位</span>
                              </el-dropdown-item>
                              <el-dropdown-item >
                                  <span @click="$router.push('/workClock')">工作打卡</span>
                              </el-dropdown-item>
                              <el-dropdown-item >
                                  <span @click="$store.commit('OUT_LOGIN')">退出登录</span></el-dropdown-item>
                          </el-dropdown-menu>
                      </el-dropdown>

                  </li>
              </ul>
          </div>
            <div>
                <router-view></router-view>
            </div>
      </div>
  </div>
</template>

<script>

export default {

  name: 'App',
    methods:{

    },
    mounted(){

    }
}
</script>

<style>
    *{
        margin:0;
        padding: 0;
    }
    ul li{
        list-style: none;
    }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
  /* body{
        background-color: #eee;
       margin: 0;
    }*/
    .top{
        width: 950px;
        height: 121px;
        background: url("./assets/head2.jpg") no-repeat center/cover;
        margin: auto;
        font-size: 30px;
        text-indent: 10px ;
        position: relative;
    }
    .top p{
        position: absolute;
        bottom: 10px;
        left: 80px;
        letter-spacing: 2px;
    }
    .nav-wrap{
        width: 950px;
        height: 40px;
        background: url("./assets/list.png");
        margin: 0 auto;
    }
    .nav-wrap li:hover{
        color: #ff0000;
    }
    .nav li{
        float: left;
        width: 82px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        color: #fff;
        letter-spacing: 2px;
    }
    .login{
        float: right;
        padding-right: 20px;
    }
    .login li{
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        color: #fff;
        height: 40px;
    }
    .login li:first-child:hover{
        color: #fff;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .el-dropdown-link{
        color: #fff;
    }
    .lunbo img{
        width: 950px;
        height: 250px;
        border:0;
    }
    .el-carousel__container{
        border: 3px solid #fff;
    }
    .foot{
        clear: both;
        background-image: url(./assets/foot.png);
        height: 74px;
        background-repeat: repeat-x;
        background-position: top;
        text-align: center;
        color:#4b4b4b;
        line-height: 74px;
    }
    .line{
        text-align: center;
    }
</style>
