<template>
  <div class="app-container">

    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input style="width: 95%" v-model="keyword" placeholder="昵称"></el-input>
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

    <el-dialog title="封号" :visible.sync="dialogVisible" width="40%" >
      <el-form ref="dataForm" :model="sysUser"  label-width="100px" size="small" style="padding-right: 40px;">
        <el-form-item label="账号" prop="userAccount">
          <el-input :value="sysUser.userAccount"/>
        </el-form-item>
        <el-form-item label="昵称" prop="userName">
          <el-input :value="sysUser.userName"/>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input :value="sysUser.age"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input :value="sysUser.sex"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input :value="sysUser.phoneNumber"/>
        </el-form-item>              
        <el-form-item label="邮箱" prop="userEmail">
          <el-input :value="sysUser.userEmail"/>
        </el-form-item>    
        <el-form-item label="角色" prop="userRole">
          <el-input :value="sysUser.userRole"/>
        </el-form-item>          
        <el-form-item label="组织" prop="teamName">
          <el-input :value="sysUser.teamName"/>
        </el-form-item>         
        <el-form-item label="状态" prop="state">
          <el-input v-if="sysUser.state === 0" value="正常"/>
          <el-input v-if="sysUser.state === 1" value="异常"/>
        </el-form-item>         
        <el-form-item label="创建时间" prop="userCreateTime">
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
import api from '@/api/system/user'
import { type } from 'os'
export default {
  data() {
    return {
      listLoading: false, // 数据是否正在加载
      list: [
        {
          id: 1, 
          userAccount: 'usst', 
          userName: '哈哈哈', 
          userAge: 19,
          userSex: 0,
          phoneNumber: '13467893245',
          userEmail: '123456789@qq.com',
          team: '上海理工大学',
          userRole: '普通用户',
          createTime: '2022-11-14 20:57:25', 
        },
        {
          id: 2, 
          userAccount: 'admin', 
          userName: '好的', 
          userAge: 20,
          userSex: 1,
          phoneNumber: '19121755640',
          userEmail: '2712748478@qq.com',
          team: '上海理工大学',
          userRole: '管理员',
          createTime: '2022-11-14 20:57:25', 
        },
      ], // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      keyword: "", // 检索关键词
      dialogVisible: false,
      sysUser: {},
    }
  },
  // 在页面渲染之前执行
  created() {
    // 若从举报来的，则显示指定的用户，否则调用列表方法
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

      api.getPageList({"page": this.page, "limit": this.limit})
        .then(response => {
          this.list = response.data.data?.result
          this.total = response.data.data?.total
        })
    }, 
    // 重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.keyword = ""
      this.fetchData()
    },
    // 根据昵称检索
    searchByName(page=1) {
      this.page = page

      api.getUserListByName({"page": this.page, "limit": this.limit, "searchObj": this.keyword})
        .then(response => {
          this.list = response.data.data?.result
          this.total = response.data.data?.total

        })
    },     
    // 根据id查询，数据回显
/*     edit(id) {
      // 弹出框
      this.dialogVisible = true
      // 调用接口查询
      // api.getUserId(id)
      //   .then(response => {
      //     this.sysUser = response.data
      //   })
      this.list.forEach(sysUser => {
        if (sysUser.id === id) {
          this.sysUser = sysUser
          console.log(sysUser)
        }
      })
    }, */
    // 封号
    ban(id) {
      // 弹出框
      this.dialogVisible = true
      // 调用接口查询
      // api.getUserId(id)
      //   .then(response => {
      //     this.sysUser = response.data
      //   })
      this.list.forEach(sysUser => {
        if (sysUser.id === id) {
          console.log(sysUser)
          this.sysUser = sysUser
        }
      })
    },
    // 保存或修改
    confirm() {
      // if (!this.sysUser.id) {
      //   this.list.push(this.sysUser)
      // }
      if (this.sysUser.state === 1) {
        this.sysUser.state = 0
      } else {
        this.sysUser.state = 1
      }
      
      // console.log(this.sysUser)
      api.banUser(this.sysUser).then(response => {
            console.log("封号成功")
            console.log(response)
          })
      // 关闭弹框
      this.dialogVisible = false
    },
    // 修改
    updata() {
      api.update(this.sysUser)
        .then(response => {
          // 提示
          this.$message.success('操作成功')
          // 关闭弹框
          this.dialogVisible = false
          // 刷新
          this.fetchData()
        })
    }
  },
}
</script>

<style>

</style>