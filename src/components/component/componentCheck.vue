<template>
  <div class="see">
    <Tabs :animated="false">
       <TabPane label="查看零件">
          <p>请选择查看方式</p><br>
          <Button type="primary" size="large" @click="searchNo">通过编号查询零件</Button>
          <Button type="primary" size="large" @click="searchId">通过id查询零件</Button>
          <div class="searchPanel" v-if="showSearchNo" style="marginTop: 20px">
            <p style="marginBottom: 10px">请输入零件编号</p>
            <i-input type=text style="width: 200px" v-model="no"></i-input>
            <Button type="primary"  @click="searchForNo">查询</Button>
          </div>
          <div class="searchPanel" v-if="showSearchId" style="marginTop: 20px">
            <p style="marginBottom: 10px">请输入零件ID</p>
            <i-input type=text style="width: 200px" v-model="id"></i-input>
            <Button type="primary"  @click="searchForId">查询</Button>
          </div>
          <div class="showSearchPanel" v-if="showSearchResult" style="marginTop: 20px" >
             <Table style="width:600px" border :columns="tableColumn" :data="tableData"></Table>
          </div>
      </TabPane>
          <TabPane label="所有零件">
             <div class="showAll">
                 <Table border :columns="allTableColumn" :data="allTableData"></Table>
             </div>
          </TabPane>
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
export default{
  data() {
    return {
     no: '',
     id:'',
     showSearchNo: false,
     showSearchId: false,
     showSearchResult: false,
     tableColumn: [
       {
         title: 'ID',
         key: 'Id',
         align: 'center',
       },
       {
         title: '材料',
         key: 'Material',
         align: 'center'
       },
       {
         title: '编号',
         key: 'No',
         align: 'center'
       },
       {
         title: '名称',
         key: 'Name',
         align: 'center'
       },
       {
         title: '质量(/g)',
         key: 'Quality',
         align: 'center'
       },
       {
         title: '数量',
         key: 'Quantity',
         align: 'center'
       }
     ],
     allTableColumn: [
      {
         title: 'ID',
         key: 'Id',
         align: 'center',
         display: 'none'
       },
      //  {
      //    title: '创建',
      //    key: 'CreatedAt',
      //    align: 'center',
      //     display: 'none'
      //  },
      //  {
      //    title: '更新',
      //    key: 'UpdatedAt',
      //    align: 'center',
      //     display: 'none'
      //  },
      //  {
      //    title: '删除',
      //    key: 'DeletedAt',
      //    align: 'center'
      //  },
       {
         title: '材料',
         key: 'Material',
         align: 'center'
       },
       {
         title: '编号',
         key: 'No',
         align: 'center'
       },
       {
         title: '名称',
         key: 'Name',
         align: 'center'
       },
       {
         title: '质量(/g)',
         key: 'Quality',
         align: 'center'
       },
       {
         title: '数量',
         key: 'Quantity',
         align: 'center'
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
                              let cid = this.allTableData[params.index].Id
                             this.remove(params.index,cid)
                            }
                        }
                    }, '删除')
                    ])
         }
       }
     ],
     tableData: [],
     allTableData: [],
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
  mounted () {
    this.allComponents()
  },
  methods: {
    allComponents() {
      this.$http.post('http://119.29.33.90:1236/api/v1/component/all', {emulateJSON: true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Data)
          var arr = res.data.Data
          this.allTableData = arr
          // this.allTableColumn.splice(0,4)

    }
  })

    },
     remove (index,cid) {
       let param = {
         'id': cid
       }
       this.$http.post('http://119.29.33.90:1236/api/v1/component/del',param,{emulateJSON: true})
       .then((res)=>{
         if(res.data.Code == 1){
           console.log("成功删除该零件！")
            this.allTableData.splice(index, 1);
            this.allComponents()
         }
       })

            },
    searchNo() {

      this.showSearchNo = true
      this.showSearchId = false
    },
    searchId () {
      this.showSearchNo = false
      this.showSearchId = true
    },
    searchForNo() {
      this.tableData = []
      this.showSearchResult = false
      let param = {
        'no': this.no
      }
      this.$http.post('http://119.29.33.90:1236/api/v1/component/get/no',param,{emulateJSON: true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Data)
          var arr1 = [
            {
              Id: res.data.Data.Id,
              Material: res.data.Data.Material,
              No: res.data.Data.No,
              Name: res.data.Data.Name,
              Quality: res.data.Data.Quality,
              Quantity: res.data.Data.Quantity
            }
          ]
          console.log(arr1[0])
          this.tableData = arr1
    }
     this.showSearchResult = true
  }).catch()
  },
  searchForId() {
    let param = {
        'id': this.id
      }
      this.$http.post('http://119.29.33.90:1236/api/v1/component/get/id',param,{emulateJSON: true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Data)
         var arr1 = [
            {
              Id: res.data.Data.Id,
              Material: res.data.Data.Material,
              No: res.data.Data.No,
              Name: res.data.Data.Name,
              Quality: res.data.Data.Quality,
              Quantity: res.data.Data.Quantity
            }
          ]
          this.tableData = arr1
    }
     this.showSearchResult = true
  })

  },
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
          this.allComponents()
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
