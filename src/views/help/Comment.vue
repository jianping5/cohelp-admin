<template>
  <div class="app-container">

    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input style="width: 95%" v-model="keyword" placeholder="评论内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>  
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini"  @click="searchByName()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>

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
      <el-table-column prop="ownerName" label="评论发布者昵称" width="100" align="center" />
      <el-table-column prop="topicTitle" label="评论活动标题" width="100" align="center" />
      <el-table-column prop="content" label="评论内容" width="520" align="center">
        <template slot-scope="scope">
          <el-card shadow="hover"> {{scope.row.content}} </el-card>
          <!-- <el-input
            :value="scope.row.feedbackContent"
            :rows="3"
            type="textarea"
            aria-disabled="true"
          /> -->
        </template>
      </el-table-column>
      <el-table-column prop="like" label="评论点赞量" align="center" />
      <el-table-column prop="remarkTime" label="评论时间" align="center" />

      <el-table-column label="操作"  align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" size="medium" @click="removeById(scope.row.id)"> 删除 </el-button>
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
import topic from '@/api/topic'
export default {
  data() {
    return {
      listLoading: false, // 数据是否正在加载
      list: [], // 列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      keyword: "",
      dialogVisible: false,
      book: {},
    }
  },
  // 在页面渲染之前执行
  created() {
    // 若从举报来的，则显示指定的互助评论，否则调用列表方法
    const obj = this.$route.params
    if (obj.id) {
      this.list = [obj]
    } else {
      this.fetchData(this.page)
    }

  },
  methods: {
    // 列表方法
    fetchData(page=1) {
      this.page = page

      topic.getRemarkList({"page": this.page, "limit": this.limit, "type": 5})
        .then(response => {
          this.list = response.data.data?.result
          this.total = response.data.data?.total
          // this.total = response.data.total
          // console.log(response)
        })
    },

    // 重置查询表单
    resetData() {
      // console.log('重置查询表单')
      this.keyword = ""
      this.fetchData()
    },

    // 根据id删除评论
    removeById(id) {
      topic.removeRemark({"id": id, "type": 5}).then(response => {
        // todo：考虑加上弹窗表示确认与否
        // console.log("删除成功")
        // this.fetchData()
        this.searchByName(this.page)
      })
    },
    
    // 搜索
    searchByName(page=1) {
      this.page = page

      topic.searchRemarkByName({"page": this.page, "limit": this.limit, "type": 5, "key": this.keyword})
        .then(response => {
          this.list = response.data.data?.result
          this.total = response.data.data?.total
        })
    },  
  
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