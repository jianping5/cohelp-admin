<template>
  <div class="app-container">

	  <!-- 列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;">

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="creatorName" label="创建者昵称" width="100" align="center" />
      <el-table-column prop="teamName" label="组织名称" width="520" align="center"/>
      <el-table-column prop="createTime" label="申请时间" align="center" />

      <el-table-column label="操作"  align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" :plain="true" size="medium" @click="agree(scope.row.id)" > 同意 </el-button>
          <el-button type="info" :plain="true" size="medium" @click="refuse(scope.row.id)"> 拒绝 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

  </div>
</template>

<script>
import create from '@/api/system/create'
export default {
  data() {
    return {
      listLoading: false, // 数据是否正在加载
      list: [], 
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      team: {}, // 接收当前用户申请
      dialogVisible: false,
      book: {},
    }
  },
  // 在页面渲染之前执行
  created() {
    // 调用列表方法
    this.fetchData(this.page)
  },
  methods: {
    // 列表方法
    fetchData(page=1) {
      this.page = page

      create.getPageList({"page": this.page, "limit": this.limit})
        .then(response => {
          this.list = response.data.data?.result
          this.total = response.data.data?.total
        })
    },
    agree(id) {
      this.list.forEach(team => {
        if (team.id === id) {
          this.team = team
          this.team.createState = 1
          console.log(id,this.team)
          return
        }
      })
      create.audit(this.team).then(response => {
          this.$message("审批完成，您已同意！")
          this.fetchData(this.page)
        })
    },
    refuse(id) {
      this.list.forEach(team => {
        if (team.id === id) {
          this.team = team
          this.team.createState = 2
          console.log(id,this.team)
          return
        }
      })
      create.audit(this.team).then(response => {
          this.$message("审批完成，您已拒绝！")
          this.fetchData(this.page)
        })  
    }
  }
}
</script>

<style>
  .search-div {
      padding: 10px;
      border: 1px solid #EBEEF5;
      border-radius: 3px;
  }
</style>