<template>
  <div class="see">
    <Tabs :animated="false">
       <TabPane label="查看零件">
          <p>请选择查看方式</p><br>
          <Button type="primary" size="large" @click="searchNo">通过编号查询零件</Button>
          <Button type="primary" size="large" @click="searchId">通过id查询零件</Button>
          <div class="searchPanel" v-if="showSearchNo">
            <p>请输入零件编号</p>
            <i-input type=text style="width: 200px" v-model="no"></i-input>
            <Button type="primary"  @click="searchForNo">查询</Button>
          </div>
          <div class="searchPanel" v-if="showSearchId">
            <p>请输入零件ID</p>
            <i-input type=text style="width: 200px" v-model="id"></i-input>
            <Button type="primary"  @click="searchForId">查询</Button>
          </div>
          <div class="showSearchPanel" v-if="showSearchResult">
            <p>零件信息</p>
          </div>
      </TabPane>
          <TabPane label="所有零件">
            <Card>
             <div class="showAll">
                {{info}}
             </div>
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
     info: '',
     inputNo: false,
     inputId: false,
     showSearchNo: false,
     showSearchId: false,
     showSearchResult: true
    }
  },
  mounted() {
     this.$http.post('http://119.29.33.90:1236/api/v1/component/all', {emulateJSON: true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Data)
          let componentInformation = res.data.Data
          this.info = componentInformation
    }
  })

  },
  methods: {
    searchNo() {

      this.showSearchNo = true
      this.showSearchId = false
      this.msg = "编号"
      this.inputNo = true
      this.inputId = false

    },
    searchId () {
      this.showSearchNo = false
      this.showSearchId = true
      this.msg = "ID"
      this.inputNO = false
      this.inputId = true

    },
    searchForNo() {
      let param = {
        'no': this.no
      }

      this.$http.post('http://119.29.33.90:1236/api/v1/component/get/no',param,{emulateJSON: true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Data)
          // let componentInformation = res.data.Data
          // this.info = componentInformation
    }
  })
  },
  searchForId() {
    let param = {
        'id': this.id
      }
      this.$http.post('http://119.29.33.90:1236/api/v1/component/get/id',param,{emulateJSON: true})
      .then((res)=>{
        if(res.data.Code == 1){
          console.log(res.data.Data)
          // let componentInformation = res.data.Data
          // this.info = componentInformation
    }
  })

  }

  }
}
</script>
