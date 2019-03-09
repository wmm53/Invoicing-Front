<template>
<div class="in">
  <Tabs :animated="false">
        <TabPane label="新建入库单">
           <p> 请输入以下信息创建一个入库单 </p>
   <Card style="width:400px">
  <Form :model="formLeft" :rules="rule" label-position="left" :label-width="85">
    <FormItem prop="no" label="编号">
      <i-input v-model="formLeft.no"></i-input>
    </FormItem>
    <FormItem prop="tag" label="备注">
      <i-input v-model="formLeft.tag"></i-input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="info">新建</Button>
    </FormItem>
  </Form>
   </Card>

        </TabPane>
        <TabPane label="所有入库单">
          <Table :columns="column" :data="data"></Table>
          <Modal v-model="showOrder" @on-ok="ok" @on-cancel="cancel">
            <Table :columns="column1" :data="data1"></Table>
          </Modal>
        </TabPane>
    </Tabs>

</div>
</template>
<script>
export default {
  data() {
    return {
      showOrder: false,
      formLeft: {
        no: '',
        tag: ''

      },
      rule:{
        no: [
          { required: true, message:'请输入入库单编号！', triggle:'blur'}
        ],
        tag: [
          { required: true, message:'请输入备注！', triggle:'blur'}
        ]
      },
      column: [
      {
        title: '单号',
        key:'OrderNo'
      },
      {
        title: '类型',
        key: 'OrderType'
      },
      {
        title: '备注',
        key: 'Tag'
      },
      {
        title: '操作',
         key: 'actor',
         align: 'center',
         render: (h,params) => {
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
                              let corderNo = this.data[params.index].OrderNo
                             this.getOrder(params.index,corderNo)
                            }
                        }
                    }, '详情')
                    ])
         }
      }
    ],
    data: [],
    column1: [
      {
        title: '单号',
        key:'OrderNo'
      },
      {
        title: '零件ID',
        key: 'ComponentId'
      },
      {
        title: '状态',
        key: 'Status'
      },
       {
        title: '零件编号',
        key: 'No'
      },
      {
        title: '零件名称',
        key: 'Name'
      },
      {
        title: '零件材料',
        key: 'Material'
      },
      {
        title: '零件质量',
        key: 'Quality'
      },
      {
        title: '操作',
         key: 'actor',
         align: 'center',
         render: (h,params) => {
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
                            //   let corderType = this.data[params.index].OrderType
                            //  this.getOrder(params.index,corderType)
                            }
                        }
                    }, '状态更新')
                    ])
         }
      },
      {
        title: '添加零件',
         key: 'actor',
         align: 'center',
         render: (h,params) => {
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
                            //   let corderType = this.data[params.index].OrderType
                            //  this.getOrder(params.index,corderType)
                            }
                        }
                    }, '单个'),
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
                            //   let corderType = this.data[params.index].OrderType
                            //  this.getOrder(params.index,corderType)
                            }
                        }
                    }, '多个')
                    ])
         }
      }
    ],
    data1: [],

    }
  },
  mounted() {
    this.getInOrder()
  },
  methods: {
    info() {
      let params = {
        'no': this.formLeft.no,
        'tag': this.formLeft.tag
      }
      this.$http.post('http://119.29.33.90:1236/api/v1/in/create/order',params,{emulateJSON: true}).
      then((res)=>{
        if(res.data.Code == 1){
          this.$Message.info("已新建入库单！")
        }

      })
    },
    getInOrder() {
      let param = {
        'order_type': 1
      }
       this.$http.post('http://119.29.33.90:1236/api/v1/order/get/type', param,{emulateJSON: true}).
      then((res)=>{
        if(res.data.Code == 1){
          var arr = res.data.Data
          this.data = arr
        }
        else{

        }
      })
    },
    getOrder(index,corderNo) {
      this.showOrder = true

    },
    ok() {

    },
    cancel() {

    }

  }
}
</script>
