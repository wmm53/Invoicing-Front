<template>
      <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-1" theme="dark" width="auto" @on-select="onMenuSelect">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        员工管理
                    </template>
                    <!-- <MenuItem name="1">权限管理</MenuItem> -->
                    <MenuItem name="1">用户管理</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        零件管理
                    </template>
                    <!-- <MenuItem name="3">添加零件</MenuItem> -->
                    <MenuItem name="2">查看零件</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                       入库单管理
                    </template>
                    <MenuItem name="3">入库单</MenuItem>
                    <!-- <MenuItem name="6">操作入库单</MenuItem> -->
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        出库单管理
                    </template>
                    <MenuItem name="4">出库单</MenuItem>
                    <!-- <MenuItem name="8">更改仓库</MenuItem> -->
                </Submenu>
                <Submenu name="5">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                       总单管理
                    </template>
                    <MenuItem name="5">所有单类</MenuItem>
                    <!-- <MenuItem name="10">更改仓库</MenuItem> -->
                </Submenu>
                <Submenu name="6">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        仓库管理
                    </template>
                    <MenuItem name="3-1">查看仓库</MenuItem>
                    <MenuItem name="3-2">更改仓库</MenuItem>
                </Submenu>
                <Submenu name="7">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        流水线管理
                    </template>
                    <MenuItem name="3-1">采购单</MenuItem>
                    <MenuItem name="3-2">投产单</MenuItem>
                    <MenuItem name="3-3">质检单</MenuItem>
                    <MenuItem name="3-4">销毁单</MenuItem>
                    <MenuItem name="3-5">产成单</MenuItem>
                    <MenuItem name="3-6">销售单</MenuItem>
                </Submenu>
                <Submenu name="8">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        日志管理
                    </template>
                    <MenuItem name="3-1">查看日志</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
              <h2 :style="{float:'left'}">ERP经销商仓库订单管理系统</h2>
              <div :style="{float:'right'}">
                <p>{{username}}，欢迎使用系统</p>
                <a href="#" @click="quit" :style="{position:'absolute',top:'24px'}">注销登录</a>
                <a href="#" @click="changePassword = true" :style="{float: 'right',marginTop:'-40px'}">修改密码</a>
                <Modal v-model="changePassword"  title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
                  <i-input v-model="newPassword"></i-input>
                </Modal>
              </div>

            </Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>切换</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                    <keep-alive>
                   <component :is="currentDetail" v-bind:userPermission="permission" v-bind:userId="id"></component>
                   </keep-alive>
                      </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import {setCookie,getCookie, delCookie} from '../js/cookie.js'
import { log } from 'util';
import { defaultCipherList } from 'constants';
export default {
  data() {
    return {
      username: '',
      id: '',
      permission: '',
      index: 0,
      array:[
        'introduction','user-manage','component-check','create-inpaper','manage-outpaper','all-order'
      ],
      changePassword: false,
      newPassword: ''
    }
  },
  computed:{
    currentDetail(){
      return this.array[this.index]
    }

  },
  mounted(){
            /*页面挂载获取保存的username值，渲染到页面上*/
            let uname = getCookie('name')
            this.username = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == ""){
                this.$router.push('/')
            }
            this.id = getCookie('iffghfj336u7dd')
            this.permission = getCookie('pwe25446rtgdsn')
            //var id =  window.sessionStorage.getItem('gh:de12905e3ti5gtgi')
            //var permission = window.sessionStorage.getItem('psfe345ygbsdfvhl')

        },
        methods:{
          ok() {
            let param = {
              'id': this.id,
              'password': this.newPassword
            }
            this.$http.post('http://119.29.33.90:1236/api/v1/staff/update/password', param, {emulateJSON: true}).
            then((res)=>{
              if(res.data.Code == 1){
                this.$Message.success("修改密码成功！")
              }
            })
          },
          cancel () {

          },
          quit() {
             delCookie('name')
             delCookie('iffghfj336u7dd')
             delCookie('pwe25446rtgdsn')
            this.$router.push('/')

          },
          onMenuSelect(name){
            this.index = name
        }
     }
}
</script>

<style scoped>
.layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>
