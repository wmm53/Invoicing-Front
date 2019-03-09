<!--<template>
  <div class="manage">
    <Tabs :animated="false">
        <TabPane label="添加零件">
          <Card style="width:400px">
          <p>请填写以下信息</p><br>
        <Form :model="formLeft" label-position="left"  :rules="ruleInline" :label-width="90" >
          <FormItem prop="no" label="零件编号">
            <i-input v-model="formLeft.no" style="{width: '180px'}"></i-input>
        </FormItem>
        <FormItem prop="no" label="零件名称">
            <i-input v-model="formLeft.name"></i-input>
        </FormItem>
        <FormItem prop="material" label="零件材质">
            <i-input v-model="formLeft.material"></i-input>
        </FormItem>
        <FormItem prop="quality" label="零件质量">
            <i-input v-model="formLeft.quality"></i-input>
        </FormItem>
        <FormItem prop="quantity" label="零件数量">
            <i-input v-model="formLeft.quantity"></i-input>
        </FormItem>
        <FormItem>
            <Button  type="primary" @click="success">添加</Button>
        </FormItem>
        </Form>

        </Card>
        </TabPane>
    </Tabs>

  </div>
</template>
<script>
export default {
  data (){
    return{
      formLeft: {
        no:'',
        name:'',
        material:'',
        quality:'',
        quantity:'',
      },
      option: '',
      ruleInline: {
        no: [
          {  required: true, message: '请输入零件编号', trigger: 'blur'}
        ],
        name: [
          {  required: true, message: '请输入零件编号', trigger: 'blur'}
        ],
        material: [
          {  required: true, message: '请输入零件编号', trigger: 'blur'}
        ],
        quality: [
          {  required: true, message: '请输入零件编号', trigger: 'blur'}
        ],
        quantity: [
          {  required: true, message: '请输入零件编号', trigger: 'blur'}
        ],
        id: [
          {  required: true, message: '请输入零件编号', trigger: 'blur'}
        ]

      },
    }
  },
  mounted() {

  },
  methods: {
    success(){
      let params = {
        'no': this.formLeft.no,
        'name': this.formLeft.name,
        'material': this.formLeft.material,
        'quality': this.formLeft.quality,
        'quantity': this.formLeft.quantity
      }
      this.$http.post('http://119.29.33.90:1236/api/v1/component/create',params,{emulateJSON: true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Msg)
          this.$Message.success('零件添加成功！')
      this.formLeft.no = ''
      this.formLeft.name = ''
      this.formLeft.material = ''
      this.formLeft.quality = ''
      this.formLeft.quantity = ''

        }

      })

    }

  }
}
</script>
<style scoped>
</style>
