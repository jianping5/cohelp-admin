<template>
  <div class="app-container">

    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input style="width: 95%" v-model="keyword" placeholder="标题/标签"></el-input>
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

      <!-- <el-table-column label="图书" width="120" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 90px; height: 90px"
            :src="scope.row.activityVOImageUrl"
            fit="contain"></el-image>
        </template>
      </el-table-column> -->
      <el-table-column prop="activityVO.activityTitle" label="活动标题" width="100" align="center" />
      <el-table-column prop="activityVO.userName" label="活动发布者" width="100" align="center" />
      <el-table-column prop="activityVO.activityTime" label="活动时间" width="100" align="center" />
      <el-table-column prop="activityVO.activityLike" label="活动点赞量" align="center" />
      <el-table-column prop="activityVO.activityComment" label="活动评论量" align="center" />
      <el-table-column prop="activityVO.activityCollect" label="活动收藏量" align="center" />
      <el-table-column prop="activityVO.activityLabel" label="活动标签" align="center" />
      <el-table-column label="活动状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.activityVO.activityState === 0" style="color: #67C23A;"> 正常 </span>
          <span v-if="scope.row.activityVO.activityState === 1" style="color: #F56C6C;"> 异常 </span>
        </template>
      </el-table-column>
      <el-table-column prop="activityVO.activityCreateTime" label="发布时间" align="center" />
      <el-table-column label="操作"  align="center" fixed="right">
        <template slot-scope="scope">
          
          <el-button v-if="scope.row.activityVO.activityState === 0" type="danger" size="medium" @click="updateState(scope.row.activityVO.id)" > 封禁 </el-button>
          <el-button v-if="scope.row.activityVO.activityState === 1" type="success" size="medium" @click="updateState(scope.row.activityVO.id)" > 解封 </el-button>
          <el-button type="primary" size="medium" @click="view(scope.row.activityVO.id)"> 详情 </el-button>
        </template>
      </el-table-column>
    </el-table>

<!--     <mavon-editor
      v-model="content"
      style="height:calc(100vh - 260px)"
    /> -->

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

    <el-dialog title="封禁/解封" :visible.sync="dialogVisible" width="40%" >
      <el-form ref="dataForm" :model="activityVO"  label-width="100px" size="small" style="padding-right: 40px;">
        <!-- <el-form-item label="活动发布者头像" prop="activityVOImageUrl">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="activityVO.activityVOImageUrl" :src="activityVO.activityVOImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>  

        </el-form-item> -->
  
        <el-form-item label="活动标题" prop="activityTitle">
          <el-input :value="activityVO.activityTitle" />
        </el-form-item>
        <el-form-item label="活动发布者" prop="userName">
          <el-input :value="activityVO.userName" />
        </el-form-item>
        <el-form-item label="活动时间" prop="activityTime">
          <el-input :value="activityVO.activityTime" />
        </el-form-item>
        <el-form-item label="活动点赞量" prop="activityLike">
          <el-input :value="activityVO.activityLike" />
        </el-form-item>
        <el-form-item label="活动评论量" prop="activityComment">
          <el-input :value="activityVO.activityComment" />
        </el-form-item>
        <el-form-item label="活动收藏量" prop="activityCollect">
          <el-input :value="activityVO.activityCollect" />
        </el-form-item>           
        <el-form-item label="活动标签" prop="activityLabel">
          <el-input :value="activityVO.activityLabel" />
        </el-form-item>                                   
        <el-form-item label="活动状态" align="center">
          <template slot-scope="scope">
            <el-input v-if="activityVO.activityState === 0" value="正常" />
            <el-input v-if="activityVO.activityState === 1" value="异常" />
          </template>
        </el-form-item>
        <el-form-item label="发布时间" prop="activityCreateTime">
          <el-input :value="activityVO.activityCreateTime" />
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
import topic from '@/api/topic'

export default {
  data() {
    return {
      ban: '封禁',
      flag: true,
      imageUrl: '',
      listLoading: false, // 数据是否正在加载
      list: [], // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      keyword: "",
      dialogVisible: false,
      activityVO: {},
      detailObj: {},
      content: ''
    }
  },
  // 在页面渲染之前执行
  created() {
    // 若从举报来的，则显示指定的活动，否则调用列表方法
    const obj = this.$route.params
    if (obj.activityVO) {
      this.list = [obj]
    } else {
      this.fetchData(this.page)
    }

  },
  methods: {
    // 列表方法
    fetchData(page=1) {
      this.page = page

      // 调用后端接口，分页查询活动列表
      topic.getList({"page": this.page, "limit": this.limit, "type": 1}).then(response => {
        this.list = response.data.data?.result
        this.total = response.data.data?.total
        console.log(response)
          // console.log(response)
          // this.total = response.data.total
        })
    },
    // 重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.keyword = ""
      this.fetchData()
    },

    // 搜索
    searchByName(page=1) {
      this.page = page

      // 调用后端接口，根据关键词查询活动列表
      topic.searchByName({"page": this.page, "limit": this.limit, "type": 1, "key": this.keyword})
        .then(response => {
          this.list = response.data.data?.result
          this.total = response.data.data?.total
        })
    },   
    // 根据id查询，数据回显
    updateState(id) {
      this.dialogVisible = true
      
      // 遍历list，获取指定id的活动
      this.list.forEach(item => {
        if (item.activityVO.id === id) {
          this.activityVO = item.activityVO
          console.log(this.activityVO)
        }
      })
    },
    // 确定
    confirm() {
      // 封禁/解封
      if (this.activityVO.activityState === 1) {
        this.activityVO.activityState = 0
      } else {
        this.activityVO.activityState = 1
      }
      
      // 调用后端更新状态接口
      topic.updateState({"type": 1, "activity": this.activityVO}).then(response => {
        console.log(response)
      })
      // 关闭弹框
      this.dialogVisible = false
    },

    // 查看内容
    view(id) {
      // 遍历数组找到对应id的主题
      this.list.forEach(item => {
        if (item.activityVO.id === id) {
          this.detailObj = item
        }
      })
      console.log(this.detailObj)
      this.$router.push({name:"ActivityContent", params: this.detailObj})

    },
    // // 成功上传图片后，需要将属性注入到图书的图片属性中
    // handleAvatarSuccess(res, file) {
    //   const imageUrl = URL.createObjectURL(file.raw)
    //   this.$set(this.activityVO,"activityVOImageUrl",imageUrl)
    //   // this.activityVO.activityVOImageUrl =  URL.createObjectURL(file.raw)
    //   //  this.$forceUpdate()

    //   console.log(".###")
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //   }
    //   return isJPG && isLt2M;
    // }
  }
}
</script>

<style>
  .search-div {
      padding: 10px;
      border: 1px solid #EBEEF5;
      border-radius: 3px;
  }
  .tools-div {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #EBEEF5;
    border-radius: 3px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>