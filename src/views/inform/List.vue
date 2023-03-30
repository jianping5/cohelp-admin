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

      <el-table-column prop="informerName" label="举报人昵称" width="100" align="center" />
      <el-table-column prop="informType" label="举报类型" width="100" align="center" />
      <el-table-column prop="informContent" label="举报内容" width="520" align="center">
        <template slot-scope="scope">
          <el-card shadow="hover"> {{scope.row.informContent}} </el-card>
          <!-- <el-input
            :value="scope.row.feedbackContent"
            :rows="3"
            type="textarea"
            aria-disabled="true"
          /> -->
        </template>
      </el-table-column>
      <el-table-column prop="informedTypeStr" label="举报对象类型" width="180" align="center"></el-table-column>
      <el-table-column prop="informTime" label="举报时间" align="center" />

      <el-table-column label="操作"  align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" :plain="true" size="medium" @click="process(scope.row.informedInstanceId, scope.row.informedInstanceType)" title="处理"> 处理 </el-button>
          <el-button type="danger" size="medium" @click="removeById(scope.row.id)" title="删除"> 删除 </el-button>
          <!-- <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
            </div>
            <el-button slot="reference">删除</el-button>
          </el-popover>           -->

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
import inform from '@/api/inform'
export default {
  data() {
    return {
      visible: false,
      listLoading: false, // 数据是否正在加载
      list: [], // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
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

      inform.getList({"page": this.page, "limit": this.limit})
        .then(response => {
          this.list = response.data.data?.result
          this.total = response.data.data?.total
          // console.log(response)
        })
    },

    // 重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.fetchData(this.page)
    },

    // 根据id删除评论
    removeById(id) {
      // this.visible = true
      inform.deleteInform({"id": id}).then(response => {
        console.log("删除成功")
        this.fetchData(this.page)
      })
    },
    
    // 处理举报
    process(informId, informType) {
      inform.getInformTarget({"id": informId, "type": informType}).then(response => {
        console.log(response)
        // todo：对以下的用户、主题、主题评论，需要做判空或状态判定处理
        if (informType === 0) {
          const user = response.data.data?.user
          
          // 判断是否已被处理
          if (user.state === 1) {
            console.log("该账号已被封禁")
            this.$message({
              message: '该账号已被封禁',
              type: 'warning'
            });
          } else {
            this.$router.push({name: 'SysUser', params: user})
          }
        }else if (informType === 1) {
          const detailResponse = response.data.data?.detailResponse
          
          // 判断是否已被处理
          if (detailResponse.activityVO.activityState === 1) {
            console.log("该活动已被封禁")
            this.$message({
              message: '该活动已被封禁',
              type: 'warning'
            });
          } else {
            this.$router.push({name: 'ActivityList', params: detailResponse})
          }
        } else if (informType === 2) {
          const detailResponse = response.data.data?.detailResponse
          
          // 判断是否已被处理
          if (detailResponse.helpVO.helpState === 1) {
            console.log("该互助已被封禁")
            this.$message({
              message: '该互助已被封禁',
              type: 'warning'
            });
          } else {
            this.$router.push({name: 'HelpList', params: detailResponse})
          }
        } else if (informType === 3) {
          const detailResponse = response.data.data?.detailResponse
          
          // 判断是否已被处理
          if (detailResponse.holeVO.holeState === 1) {
            console.log("该树洞已被封禁")
            this.$message({
              message: '该树洞已被封禁',
              type: 'warning'
            });
          } else {
            this.$router.push({name: 'HoleList', params: detailResponse})
          }
        } else if (informType === 4) {
          const detailRemark = response.data.data?.detailRemark
          
          // 判断是否已被处理
          if (detailRemark == null) {
            console.log("该活动评论已被删除")
            this.$message({
              message: '该活动评论已被删除',
              type: 'warning'
            });
          } else {
            this.$router.push({name: 'ActivityComment', params: detailRemark})
          }
        } else if (informType === 5) {
          const detailRemark = response.data.data?.detailRemark
          
          // 判断是否已被处理
          if (detailRemark == null) {
            console.log("该互助评论已被删除")
            this.$message({
              message: '该互助评论已被删除',
              type: 'warning'
            });
          } else {
            this.$router.push({name: 'HelpComment', params: detailRemark})
          }
        } else if (informType === 6) {
          const detailRemark = response.data.data?.detailRemark
          
          // 判断是否已被处理
          if (detailRemark == null) {
            console.log("该树洞评论已被删除")
            this.$message({
              message: '该树洞评论已被删除',
              type: 'warning'
            });
          } else {
            this.$router.push({name: 'HoleComment', params: detailRemark})
          }
        }
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