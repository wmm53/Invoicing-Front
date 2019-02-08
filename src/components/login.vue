<template>
  <div>
    <!-- <Card style="width:400px" v-if="showRegister">
      <p slot="title">
            <Icon type="ios-film-outline"></Icon>
           用户注册
      </p>
      <Form  ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80" >
        <FormItem prop="username" label="姓名">
            <i-input type="text" v-model="formInline.username" placeholder="username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem prop="Englishname" label="英文名">
            <i-input type="text" v-model="formInline.Englishname" placeholder="Englishname">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem prop="telephone" label="电话号码">
            <i-input type="text" v-model="formInline.telephone" placeholder="telephone">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem prop="birthday" label="出生日期">
            <DatePicker type="datetime" :value='datevalue' placeholder="1996-12-02 00:00:00" style="width: 286px"></DatePicker>
        </FormItem>
        <FormItem prop="id" label="身份证">
            <i-input type="text" v-model="formInline.id" placeholder="id">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
         <FormItem prop="password" label="密码">
            <i-input type="password" v-model="formInline.password" placeholder="password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">注册</Button>
        </FormItem>
      </Form>
    </Card> -->
    <div  class="loginPanel">
    <Card style="width:400px" v-if="showLogin">
      <p slot="title">
            <Icon type="ios-film-outline"></Icon>
           用户登录
      </p>
      <p v-show="showWarning" :style="{marginLeft:'40%',color:'red'}">{{warning}}</p>
 <Form  ref="formInline" :model="formInline" :rules="ruleInline" :label-width="85" >

        <FormItem prop="username" label="英文名">
            <i-input type="text" v-model="formInline.username" placeholder="Englishname">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem prop="password" label="密码">
            <i-input type="password" v-model="formInline.password" placeholder="password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem>
            <Button  type="primary" @click="login">登录</Button>
        </FormItem>
       </Form>

    </Card>
    </div>
  </div>
</template>
<script>
import {setCookie,getCookie} from '../js/cookie.js'
export default {
   mounted() {

},
  methods: {
          chooseRegister() {
           this.showRegister = true
           this.showLogin = false
          },
          login() {
            let params = {
              'username':this.formInline.username,
              'password':this.formInline.password
            }
            /** 接口请求 */
              this.$http.post('http://119.29.33.90:1236/api/v1/staff/login',params,{headers:{},emulateJSON: true})
              .then((res)=>{
              //  console.log(res)
              //  console.log(res.data.Code)
              //  console.log(res.data.Data)
              // console.log(res.data.Data.Id)

              if(res.data.Code == 1){
                  var id = res.data.Data.Id
                  var permission = res.data.Data.Permission
                  var user = res.data.Data.Name
                  setCookie('iffghfj336u7dd',id,1000*60)
                  setCookie('pwe25446rtgdsn',permission,1000*60)
                  setCookie('name',user,1000*60)
                  setTimeout(function(){
                      this.$router.push('/index')
                      // alert('登陆成功')
                  }.bind(this),100)
              }else if(res.data.Code == -1001){
                this.showWarning = true
                this.warning = '用户名不存在！'
              }
              else if(res.data.Code == -1003){
                this.showWarning = true
                this.warning = '密码错误！'

              }
            })
          },
 },
   data () {
            return {
                formInline: {
                    username: '',
                    Englishname: '',
                    password: '',
                    telephone: '',
                    id: '',
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请输入英文名', trigger: 'blur' }
                    ],
                    Englishname: [
                       { required: true, message: '请输入英文名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不少于6位', trigger: 'blur' }
                    ],
                    telephone: [
                      {required: true, message: '请输入11位电话号码', trigger: 'blur'},
                       { type: 'string', trigger: 'blur'}
                    ],
                    id: [
                      {required: true, message: '请输入身份证号码', trigger: 'blur'},
                       { type: 'string', trigger: 'blur'}
                    ],
                    birthday: [
                      {required: true,message: '',trigger: 'blur'},
                      {type: 'string'}
                    ]
                },
                showRegister: false,
                showLogin: true,
                showWarning: true,
                datevalue: '',
                warning:''
            }
       }

}
</script>
<style scoped>
.loginPanel{
  width:600px;
  /* height: 800px; */
  margin:0 auto;
background:#216f8d;
}
.ivu-card.ivu-card-bordered{
   margin:100px auto;
}
</style>

