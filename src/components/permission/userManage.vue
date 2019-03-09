<template>
  <div class="create">
    <Tabs :animated="false">
    <TabPane label="用户管理">
      <!-- <Button type="primary" @click="allUsers">查看用户</Button> -->
      <Table border :columns="column" :data="data"></Table>
       <Modal v-model="updatePermission"  title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
                  <i-input v-model="newPermission"></i-input>
       </Modal>
    </TabPane>
    <TabPane label="添加新用户">
      <p>请填写以下信息</p>
      <Card style="width:400px">
      <Form :model="formInline" :rules="ruleInline" :label-width="85" label-position="left" >
        <FormItem prop="name" label="姓名">
            <i-input type="text" v-model="formInline.name" placeholder="name">
            </i-input>
        </FormItem>
        <FormItem prop="Englishname" label="英文名">
            <i-input type="text" v-model="formInline.Englishname" placeholder="Englishname">
            </i-input>
        </FormItem>
        <FormItem prop="password" label="密码">
            <i-input type="password" v-model="formInline.password" placeholder="password">
            </i-input>
        </FormItem>
        <FormItem prop="telephone" label="电话号码">
            <i-input type="text" v-model="formInline.telephone" placeholder="telephone">
            </i-input>
        </FormItem>
        <FormItem prop="birthday" label="出生日期">
            <DatePicker type="datetime" v-model='formInline.birthday' format="yyyy-MM-dd HH:mm:ss" @on-change="time" placeholder="1996-12-02 00:00:00" style="width: 284px"></DatePicker>
        </FormItem>
        <FormItem prop="idCard" label="身份证">
            <i-input type="text" v-model="formInline.idCard" placeholder="idCard">
            </i-input>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="submit">添加</Button>
        </FormItem>
      </Form>
    </Card>
    </TabPane>
  </Tabs>
  </div>
</template>
<script>
export default {
  data(){
    return {
      updatePermission: false,
      newPermission: '',
      cid: '',
      date: '',
      formInline: {
        name: '',
        Englishname: '',
        telephone: '',
        birthday: '',
        idCard: '',
        password: '',
      },
      ruleInline:{
                     name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    Englishname: [
                       { required: true, message: '请输入英文名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不少于6位' }
                    ],
                    telephone: [
                      {required: true, message: '请输入11位电话号码', trigger: 'blur'},
                       { type: 'string', min: 11, trigger: 'blur'}
                    ],
                    idCard: [
                      {required: true, message: '请输入身份证号码', trigger: 'blur'},
                       { type: 'string', trigger: 'blur'}
                    ],
                    birthday: [
                      { "type": "date",
                        required: true, message: '请按规定格式输入日期',trigger: 'blur'},
                    ]
      },


      column: [
        {
          title:'ID',
          key: 'Id',
          align: 'center'
        },
        // {
        //   title: '员工编号',
        //   key: ''
        // }
        {
          title: '姓名',
          key: 'Name',
          align: 'center'
        },
        {
          title: '英文名',
          key: 'EnglishName',
          align: 'center'

        },
        {
          title: '出生日期',
          key:'Birthday',
          align: 'center'
        },
        {
          title: '电话号码',
          key:'Telephone',
          align: 'center'

        },
        {
        title: '用户操作',
        key: 'actor',
        align: 'center',
        render: (h, params) => {
          return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          let cid = this.data[params.index].Id
                                          this.show(params.index,cid)
                                        }
                                    }
                                }, '删除用户'),
                            ]);
                        }
        },
        {
        title: '权限操作',
        key: 'actor',
        width: 150,
        align: 'center',
        render: (h, params) => {
          return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          let cid = this.data[params.index].Id
                                          this.show(params.index,cid)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                          let cid = this.data[params.index].Id
                                            this.update(cid)
                                        }
                                    }
                                }, '修改'),
                            ]);
                        }
        },

      ],
      data: []

    }
  },
  mounted() {
    this.allUsers()

  },
  methods: {
    time(e) {
      this.date = e
    },
    allUsers() {
      this.$http.post('http://119.29.33.90:1236/api/v1/staff/all',{emulateJSON:true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Data)
          var arr = res.data.Data
          // arr.splice(1,3)
          // var arr1 = arr.splice(3,1)
          // var arr2 = arr1.splice(4,1)
          this.data = arr
          // this.data.splice(1,3).splice(3,1).splice(4,1)
        }

      })
    },
    show(index,cid) {
      let param = {
        'staff_id': cid
      }
      this.$http.post('http://119.29.33.90:1236/api/v1/permission/getbystaff',param,{emulateJSON: true}).
      then((res)=>{
        if(res.data.Code == 1){
          var permission = res.data.Data
           this.$Modal.info({
                    title: 'User Info',
                    content: `姓名：${this.data[index].Name}<br>
                              权限：${permission}`
                })
        }
      })
    },
    update(cid) {
      this.updatePermission = true
      this.cid = cid

      },
      ok()
      {
        let params = {
        'staff_id': this.cid,
        'context': this.newPermission
      }
        this.$http.post('http://119.29.33.90:1236/api/v1/permission/update',params,{emulateJSON: true}).
      then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Msg)
          this.$Message.info("权限修改成功！")
          this.allUsers()
        }
        else{
           this.$Message.error("权限修改失败！")
        }
      })
      },
      cancel() {

      },
      submit() {
        let params = {
          'name': this.formInline.name,
          'english_name': this.formInline.Englishname,
          'password': this.formInline.password,
          'telephone': this.formInline.telephone,
          'id_card': this.formInline.idCard,
          'birthday': this.date
        }
        console.log(this.date)
        this.$http.post('http://119.29.33.90:1236/api/v1/staff/create', params, {emulateJSON: true}).
            then((res)=>{
              if(res.data.Code == 1){
                this.$Message.success("添加用户成功！")
                this.formInline.name = ''
                this.formInline.Englishname = ''
                this.formInline.password = ''
                this.formInline.telephone = ''
                this.formInline.idCard = ''
                this.formInline.birthday = ''
              }
            })

      }
  }
}
</script>

