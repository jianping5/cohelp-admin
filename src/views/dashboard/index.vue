<template>
  <div class="dashboard-container">

  <template>

    <el-row >
      <div style="margin-bottom: 180px;">
        <el-col :span="10">
          <template>
            <el-card style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); width: 295px;">
              <!-- <i class="el-icon-user" size="large"></i> -->
              <template #header>
                <div class="card-header">
                  <span class="el-icon-user" style="font-size:27px"></span>
                  <span style="float: right; margin-right: 55%;"> 用户昵称 </span>
                </div>
              </template>
              <div class="text item"> {{ name }} </div>
            </el-card>
          </template>      
        </el-col>

        <el-col :span="9">
          <template>
            <el-card style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); width: 295px;">
              <template #header>
                <div class="card-header">
                  <span class="el-icon-user-solid" style="font-size:27px"></span>
                  <span style="float: right; margin-right: 55%;"> 用户账号 </span>
                </div>
              </template>
              <div class="text item"> {{ account }} </div>
            </el-card>
          </template>
        </el-col>

        <el-col :span="4">
          <template>
            <el-card style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); width: 295px;">
              <template #header>
                <div class="card-header">
                  <span class="el-icon-monitor" style="font-size:27px">  </span>
                  <span style="float: right; margin-right: 55%;"> 组织名称 </span>
                  
                </div>
              </template>
              <div class="text item"> {{ team }}</div>
            </el-card>
          </template>
        </el-col>
      </div>
      
    <!-- </el-row> -->

    <!-- <el-row class="el-row"> -->
      <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 1%; margin-bottom: 20px;">
        <Chart></Chart>
      </div>
      <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 1%">
        <PieChart></PieChart>
      </div>


      <!-- <BarChart></BarChart> -->
      <!-- <LinkChart></LinkChart> -->

    </el-row>
  </template>



  </div>
</template>

<script>
import BarChart from './components/BarChart.vue';
import PieChart from './components/PieChart.vue';
import LinkChart from './components/LinkChart.vue'
import Chart from './components/Chart.vue'
import { getInfo } from '@/api/user'
import image from '@/api/image'
import { setAvatar } from '@/utils/auth';


export default {
  components: { BarChart, PieChart, LinkChart, Chart },
  data() {
    return {
      name: "",
      team: "",
      account: "",
      avatar: 0,
    }
  },
  created() {
    getInfo().then(response => {
      this.name = response.data.data?.userName
      this.team = response.data.data?.teamName
      this.account = response.data.data?.userAccount
      this.avatar = response.data.data?.avatar
      image.getImageById({"imageId": this.avatar}).then(response => {
        this.$store.commit('user/SET_AVATAR', response.data.code)
        setAvatar(response.data.code)
        // console.log(response)
      })
    })

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 21px;

}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 240px;
  background-color: skyblue;
}

.el-row {
  margin-bottom: 100px;
}

</style>
