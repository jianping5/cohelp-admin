<template>
  <div class="app-container">

      <el-form  label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-upload class="upload"
                 ref="upload"
                 action="string"
                 :file-list="fileList"
                 :auto-upload="false"	
                 :http-request="uploadFile"		
                 :on-change="handleChange"	
                 :on-remove="handleRemove"	
                 multiple="multiple">	
              <el-button slot="trigger"
                        size="small"
                        type="primary"
                        style="margin-right: 10px;"
                        @click="delFile">选取文件
                      </el-button>
              <el-button type="primary"
                      size="small"
                          @click="onSubmit">上传
                        </el-button>
              </el-upload>
          </el-col>
        </el-row>
      </el-form>

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

      <el-table-column prop="userName" label="学生姓名" width="250" align="center"/>
      <el-table-column prop="courseName" label="课程名称" align="center" />
      <el-table-column prop="semester" label="学年" align="center" />
      <el-table-column prop="score" label="积分" align="center" />
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
import team from '@/api/team'
import { getTeamId } from '@/utils/auth'
export default {
  data() {
    return {
      listLoading: false, // 数据是否正在加载
      list: [], // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      keyword: "", // 检索关键词
      dialogVisible: false,
      teamId: 1,
      fileList: [],
      // 不支持多选
      multiple: false,
      formData: "",
    }
  },
  // 在页面渲染之前执行
  created() {
    // 若从举报来的，则显示指定的用户，否则调用列表方法
    this.teamId = getTeamId()
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

      team.listSelection({"page": this.page, "limit": this.limit, "teamId": this.teamId})
        .then(response => {

          this.list = response.data.data?.result
          console.log(this.list)
          this.total = response.data.data?.total
        })
    }, 
  
    // 根据id删除评论
    removeById(id) {
      // this.visible = true
      team.deleteSelection(id).then(response => {
        console.log("删除成功")
        this.fetchData(this.page)
      })
    },
    
    //点击上传文件触发的额外事件,清空fileList
    delFile () {
      this.fileList = [];
    },
    handleChange (file, fileList) {
      this.fileList = fileList;
    },
    //自定义上传文件
    uploadFile (file) {
      this.formData.append("file", file.file);
      console.log(56767)
    },
    //删除文件
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    // 提交文件到后端
    onSubmit () {
      let formData = new FormData();
      formData.append("file", this.fileList[0].raw);//拿到存在fileList的文件存放到formData中
      team.importSelection(formData).then(response => {
        console.log("上传成功")
        this.fetchData()
        this.delFile()
      })
    }
  }
}
</script>

<style>

</style>