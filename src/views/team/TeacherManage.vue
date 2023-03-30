<template>
  <div class="app-container">


    
    <el-row style="margin-bottom: 10px;">
          <el-button type="primary" size="small"  @click="addUser()">添加教师</el-button>
        </el-row>

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

      <el-table-column prop="userAccount" label="账号" width="180" align="center"/>
      <el-table-column prop="userName" label="昵称" width="110" align="center"/>
      <el-table-column prop="age" label="年龄" align="center" />
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">{{scope.row.userSex?"男":"女"}}</template>
      </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号" align="center" />
      <el-table-column prop="userEmail" label="邮箱" align="center" />
      <el-table-column prop="userRole" label="角色" align="center" />
      <el-table-column prop="teamName" label="组织" align="center" />
      <el-table-column prop="state" label="状态" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.state === 0" style="color: #67C23A;"> 正常 </span>
          <span v-if="scope.row.state === 1" style="color: #F56C6C;"> 异常 </span>
        </template>
      </el-table-column>
      <el-table-column prop="userCreateTime" label="创建时间" align="center" />
      <el-table-column label="操作"  align="center" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state === 0" type="danger" size="medium" @click="ban(scope.row.id)"> 封号 </el-button>
          <el-button v-if="scope.row.state === 1" type="success" size="medium" @click="ban(scope.row.id)"> 解封 </el-button>
          <!-- <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除" /> -->
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

    <el-dialog title="添加教师" :visible.sync="dialogVisible" width="40%" >
      <el-form ref="dataForm" :model="sysUser"  label-width="100px" size="small" style="padding-right: 40px;">
        <el-form-item label="账号" prop="userAccount">
          <el-input v-if="addOrBan == 0" v-model="sysUser.userAccount"/>
          <el-input v-if="addOrBan == 1" :value="sysUser.userAccount"/>
        </el-form-item>
        <el-form-item label="昵称" prop="userName">
          <el-input v-if="addOrBan == 0" v-model="sysUser.userName"/>
          <el-input v-if="addOrBan == 1" :value="sysUser.userName"/>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-if="addOrBan == 0" v-model="sysUser.age"/>
          <el-input v-if="addOrBan == 1" :value="sysUser.age"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-if="addOrBan == 0" v-model="sysUser.sex" placeholder="0：女 1：男"/>
          <el-input v-if="addOrBan == 1" :value="sysUser.sex"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-if="addOrBan == 0" v-model="sysUser.phoneNumber"/>
          <el-input v-if="addOrBan == 1" :value="sysUser.phoneNumber"/>
        </el-form-item>              
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-if="addOrBan == 0" v-model="sysUser.userEmail"/>
          <el-input v-if="addOrBan == 1" :value="sysUser.userEmail"/>
        </el-form-item>    
        <el-form-item v-if="addOrBan == 1" label="角色" prop="userRole">
          <el-input :value="sysUser.userRole"/>
        </el-form-item>          
        <el-form-item v-if="addOrBan == 1" label="组织" prop="teamName">
          <el-input :value="sysUser.teamName"/>
        </el-form-item>         
        <el-form-item v-if="addOrBan == 1" label="状态" prop="state">
          <el-input v-if="sysUser.state === 0" value="正常"/>
          <el-input v-if="sysUser.state === 1" value="异常"/>
        </el-form-item>         
        <el-form-item v-if="addOrBan == 1" label="创建时间" prop="userCreateTime">
          <el-input :value="sysUser.userCreateTime"/>
        </el-form-item>        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="confirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import team from '@/api/team'
import user from '@/api/system/user'
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
      sysUser: {},
      teamId: 1,
      addOrBan: 0,
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

      team.listTeacher({"page": this.page, "limit": this.limit, "teamId": this.teamId})
        .then(response => {
          this.list = response.data.data?.result
          this.total = response.data.data?.total
        })
    }, 
  
    // 封号
    ban(id) {
      // 弹出框
      this.dialogVisible = true
      this.addOrBan = 1
      this.list.forEach(sysUser => {
        if (sysUser.id === id) {
          console.log(sysUser)
          this.sysUser = sysUser
        }
      })
    },
    addUser() {
      this.sysUser = {}
      this.dialogVisible = true
      this.addOrBan = 0
    },
    
    // 保存或修改
    confirm() {
      if (this.addOrBan == 0) {
        team.addTeacher(this.sysUser).then(response => {
          console.log("添加成功")
          this.fetchData()
        })
      } else {
        if (this.sysUser.state === 1) {
          this.sysUser.state = 0
        } else {
          this.sysUser.state = 1
        }
      
        // console.log(this.sysUser)
        user.banUser(this.sysUser).then(response => {
              console.log("封号成功")
              console.log(response)
            })
      }

      // 关闭弹框
      this.dialogVisible = false
      console.log(123123)
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
      team.importTeacher(formData).then(response => {
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