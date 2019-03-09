<template>
  <div class="manage">
   <!-- <Tabs :animated="false">
        <TabPane label="查询权限">
          <p>请输入staff_id</p>
          <i-input v-model="staff_id" style="width: 200px"></i-input>
          <Button @click="search"  type="primary">点击查询</Button>
          <Button @click="allUsersPermission" type="primary">查看所有用户权限</Button>
          <Card :style="{width: '200px',margin: '20px 0'}" v-if="showSinglePermission">
            <p> staff_id: {{staff_id}} </p>
            <p> permission: {{staff_permission}}</p>
          </Card>
           <Table height="200" :columns="columns1" :data="data2" v-if="allPermission" style="marginTop: 20px"></Table>
          </TabPane>
          <TabPane label="创建权限">
         <Card style="width: 500px">


         <Form :model="formL" :rules="rule" label-position="left" :label-width="85">
           <FormItem prop="staff_id" label="staff_id" >
             <i-input  v-model="formL.staff_id"></i-input>
           </FormItem>
           <FormItem prop="context" label="permission" >
             <i-input v-model="formL.context"></i-input>
           </FormItem>
           <FormItem>
            <Button  type="primary" @click="info">确认创建</Button>
        </FormItem>
         </Form>
          </Card>
        </TabPane>
        <TabPane label="修改权限">
          <Card style="width: 500px">
         <Form :model="formLeft" :rules="ruleInline" label-position="left" :label-width="85">
           <FormItem prop="staff_id" label="staff_id" >
             <i-input  v-model="formLeft.staff_id"></i-input>
           </FormItem>
           <FormItem prop="context" label="permission" >
             <i-input v-model="formLeft.context"></i-input>
           </FormItem>
           <FormItem>
            <Button  type="primary" @click="success">确认修改</Button>
        </FormItem>
         </Form>
          </Card>
        </TabPane>

    </Tabs> -->

  </div>
</template>
<script>
export default {
  props: {
    userPermission: {
     type: String,
     required: true
    },
    userId: {
      type: String,
     required: true
    }
    },
    mounted(){
     //console.log(this.userId)
    },
  data() {
    return {
      showSinglePermission: false,
      allPermission: false,
      staff_id: '',
      staff_permission: '',
      columns1: [
                    {
                        title: 'ID',
                        key: 'Id'
                    },
                    {
                        title: 'CreatedAt',
                        key: 'CreatedAt'
                    },
                    {
                        title: 'UpdatedAt',
                        key: 'UpdatedAt'
                    },
                    {
                        title: 'DeletedAt',
                        key: 'DeletedAt'
                    },
                     {
                        title: 'staff_id',
                        key: 'StaffId'
                    },
                     {
                        title: 'permission',
                        key: 'Context'
                    },

                ],
                data2: [],
                formLeft:{
                  staff_id: '',
                  context: ''
                },
                ruleInline: {
        staff_id: [
          {  required: true, message: '请输入staff_id', trigger: 'blur'}
        ],
        context: [
          {  required: true, message: '请输入权限', trigger: 'blur'}
        ]

      },
      formL:{
                  staff_id: '',
                  context: ''
                },
                rule: {
        staff_id: [
          {  required: true, message: '请输入staff_id', trigger: 'blur'}
        ],
        context: [
          {  required: true, message: '请输入权限', trigger: 'blur'}
        ]
      },

    }
  },
  methods: {
    search(){
      let param = {
        'staff_id': this.staff_id
      }
      this.$http.post('http://119.29.33.90:1236/api/v1/permission/getbystaff',param,{emulateJSON:true})
      .then((res)=>{
        if(res.data.Code == 1){
        console.log(res)
        var permission = res.data.Data
        this.staff_permission = permission
        this.showSinglePermission = true
        }

      })

    },
    allUsersPermission() {
      this.$http.post('http://119.29.33.90:1236/api/v1/permission/getall',{emulateJSON:true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Data)
          var arr = res.data.Data
          this.data2 = arr
          // this.columns1.splice(1,3)
          this.allPermission = true

    }

      })
    },
    success() {
       let params = {
        'staff_id': this.formLeft.staff_id,
        'context': this.formLeft.context
      }
      this.$http.post('http://119.29.33.90:1236/api/v1/permission/update',params,{emulateJSON: true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Msg)
          this.$Message.success('权限修改成功！')
      this.formLeft.staff_id = ''
      this.formLeft.context = ''
        }

      })

    },
    info() {
      let params = {
        'staff_id': this.formL.staff_id,
        'context': this.formL.context
      }
      this.$http.post('http://119.29.33.90:1236/api/v1/permission/create',params,{emulateJSON: true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Msg)
          this.$Message.info('已创建用户权限！')
      this.formLeft.staff_id = ''
      this.formLeft.context = ''
        }

      })

    }

  }
}
</script>
