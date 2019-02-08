<template>
  <div class="query">
     <Input icon="ios-search" v-model="staff_id" placeholder="Enter something..." style="width: 200px" @on-click="search" />
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
      staff_id: '1',
      staff_permission: ''

    }
  },
  methods: {
    search(){
      let staff_id = this.staff_id
      this.$http.post('http://119.29.33.90:1236/api/v1/permission/getbystaff',staff_id,{emulateJSON:true})
      .then((res)=>{
        console.log(res)

      })


    }

  }
}
</script>
