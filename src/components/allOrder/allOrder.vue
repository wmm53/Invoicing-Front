<template>
  <div class="all">
   <Tabs :animated="false">
    <TabPane label="单类管理">
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
    return{
      showOrder: false,
      OrderType:'',
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
                              let corderType = this.data[params.index].OrderType
                             this.getByOrderType(params.index,corderType)
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
                              let corderType = this.data[params.index].OrderType
                             this.getByOrderType(params.index,corderType)
                            }
                        }
                    }, '详情')
                    ])
         }
      }
    ],
    data1:[]
    }
  },
  mounted() {
    this.getAllOrder()

  },
  methods: {
    getAllOrder() {
       this.$http.post('http://119.29.33.90:1236/api/v1/order/get/all', {emulateJSON: true}).
      then((res)=>{
        if(res.data.Code == 1){
          var arr = res.data.Data
          this.data = arr
        }
        else{

        }
      })

    },
    getByOrderType(index,corderType) {
      this.showOrder = true


    },
    ok() {

    },
    cancel() {

    }

  }
}
</script>


