<template>
  <el-container>
      <el-header>
          <el-row>
              <el-col :span="8" class="logo" :style="{width:isCollapse?'64px':'240px'}">
                  <strong>
                      {{isCollapse?"勤":" 勤工助学管理系统"}}
                  </strong>
              </el-col>
              <el-col :span="8" class="tool">
                  <i :class="isCollapse?'el-icon-caret-right':'el-icon-caret-left'" @click="isCollapse=!isCollapse"></i>
              </el-col>
              <el-col :span="8" class="admin-info">
                  <el-dropdown>
                      <span class="el-dropdown-link">
                        <span>{{$store.state.admin.adminName}}</span>
                          <img src="../static/logo2.jpg" alt="">
                      </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item ><span @click="$store.commit('OUT_LOGIN')">退出登录</span></el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </el-col>
          </el-row>
      </el-header>
      <el-container>
          <el-aside :style="{width:isCollapse?'auto':'240px'}">
              <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
                       :collapse-transition=false
                       :collapse="isCollapse">
                  <el-menu-item index="1" @click="$router.push('/')">
                  <i class="el-icon-menu"></i>
                  <span slot="title" >查看管理员日志</span>
                  </el-menu-item>
                  <el-submenu index="2">
                      <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span slot="title">招聘内容</span>
                      </template>
                      <el-menu-item index="1-1-1" @click="$router.push('/allWork')">全天工</el-menu-item>
                      <el-menu-item index="1-1-2"  @click="$router.push('/HourWrok')">小时工</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="3" @click="$router.push('/resume')">
                      <i class="el-icon-edit-outline"></i>
                      <span slot="title">简历审批</span>
                  </el-menu-item>
                  <el-menu-item index="4" @click="$router.push('/pass')">
                      <i class="el-icon-check"></i>
                      <span slot="title">录用人员信息</span>
                  </el-menu-item>
                  <el-menu-item index="5" @click="$router.push('/notPass')">
                      <i class="el-icon-close"></i>
                      <span slot="title">不适合人员信息</span>
                  </el-menu-item>
                  <el-menu-item index="6" @click="$router.push('/working')">
                      <i class="el-icon-menu"></i>
                      <span slot="title"  >派出管理</span>
                  </el-menu-item>
                  <el-menu-item index="7"  @click="$router.push('/lunBo')">
                      <i class="el-icon-menu"></i>
                      <span slot="title">轮播图内容</span>
                  </el-menu-item>
                  <el-menu-item index="8" @click="$router.push('/news')">
                      <i class="el-icon-menu"></i>
                      <span slot="title"  >学校新闻</span>
                  </el-menu-item>
              </el-menu>
          </el-aside>
          <el-main>
              <router-view></router-view>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
    import css from '../static/body.css'
export default {
  name: 'App',
    data(){
      return{
          isCollapse:false
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
    *{
        margin: 0;
        padding: 0;
    }
    .el-header{
        background: rgb(47,64,80);
        /*background: #a10000;*/
        height: 60px;
        padding: 0;
    }
    .logo{
        line-height: 60px;
        width: 240px;
        text-align: center;
        border-right:1px solid rgba(238,241,146,0.3);
    }
    .logo strong{
        font-size: 30px;
        color: #fff;
    }
    .admin-info{
        float:right;
        padding-right:20px;
        text-align:right;
        vertical-align:middle;
    }
    .admin-info img {
        width:40px;
        height:40px;
        border-radius:50%;
        vertical-align:middle;
    }
    .admin-info span{
        color: #fff;
        line-height: 60px;

    }
    .tool{
        font-size:30px;
        color:#fff;
        line-height:60px;
        cursor: pointer;
    }
    .el-table th,.el-table td{
        text-align: center;
    }
    .toolbar{
        background:#f4f4f4;
        padding:10px;
        margin:0 0 10px 0;
    }
    .toolbar .el-form-item{
        margin-bottom:0px;
    }
</style>
