<template>
  <div class="app-container">

    <!-- <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input style="width: 95%" v-model="searchObj.keyword" placeholder="账号/昵称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div> -->

    <mavon-editor
      v-model="content"
      style="height:calc(100vh - 260px)"
    />

    <el-row style="display:flex; margin-left: 48%; margin-top: 15px;">
      <!-- <el-button type="danger" size="large" @click="updateState(activityVO.id)"> 封禁 </el-button> -->
      <el-button v-if="helpVO.helpState === 0" type="danger" size="medium" @click="updateState(helpVO.id)" > 封禁 </el-button>
      <el-button v-if="helpVO.helpState === 1" type="success" size="medium" @click="updateState(helpVO.id)" > 解封 </el-button>
    </el-row>

    <el-dialog title="封禁/解封" :visible.sync="dialogVisible" width="40%" >
      <el-form ref="dataForm" :model="helpVO"  label-width="100px" size="small" style="padding-right: 40px;">
        <!-- <el-form-item label="图书" prop="helpVOImageUrl">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="helpVO.helpVOImageUrl" :src="helpVO.helpVOImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>  

        </el-form-item> -->
  
        <el-form-item label="互助标题" prop="helpVOTitle">
          <el-input :value="helpVO.helpTitle" />
        </el-form-item>
        <el-form-item label="互助发布者" prop="userName">
          <el-input :value="helpVO.userName" />
        </el-form-item>
        <el-form-item label="互助点赞量" prop="helpLike">
          <el-input :value="helpVO.helpLike" />
        </el-form-item>
        <el-form-item label="互助评论量" prop="helpComment">
          <el-input :value="helpVO.helpComment" />
        </el-form-item>
        <el-form-item label="互助收藏量" prop="helpCollect">
          <el-input :value="helpVO.helpCollect" />
        </el-form-item>           
        <el-form-item label="互助标签" prop="helpLabel">
          <el-input :value="helpVO.helpLabel" />
        </el-form-item>                                   
        <el-form-item label="互助有/无偿" align="center">
          <template slot-scope="scope">
            <el-input v-if="helpVO.helpPaid === 0" value="无偿" />
            <el-input v-if="helpVO.helpPaid === 1" value="有偿" />
          </template>
        </el-form-item>
        <el-form-item label="互助状态" align="center">
          <template slot-scope="scope">
            <el-input v-if="helpVO.helpState === 0" value="正常" />
            <el-input v-if="helpVO.helpState === 1" value="异常" />
          </template>
        </el-form-item>
        <el-form-item label="发布时间" prop="helpCreateTime">
          <el-input :value="helpVO.helpCreateTime" />
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
      helpVO: {},
      content: "",
      dialogVisible: false,
    }
  },
  // 在页面渲染之前执行
  created() {
    // 对获取的主题内容+图片进行格式化处理，然后显示
    const formatImageUrlList = []
    const imageUrlList = this.$route.params.imagesUrl
    imageUrlList.forEach(item => {
      formatImageUrlList.push('\n![](' + item + ') ')
    });

    // 需要显示的内容（字符串）
    this.content = this.$route.params.helpVO.helpDetail + [formatImageUrlList]
    // 初始化helpVO，便于封禁显示相关信息
    this.helpVO = this.$route.params.helpVO
    // console.log(content)
  },
  methods: {
    // 根据id查询，数据回显
    updateState(id) {
      this.dialogVisible = true
    },
    // 确定
    confirm() {
      // 封禁/解封
      if (this.helpVO.helpState === 1) {
        this.helpVO.helpState = 0
      } else {
        this.helpVO.helpState = 1
      }
      
      topic.updateState({"type": 2, "help": this.helpVO}).then(response => {
        // 封禁成功
        console.log(response)
      })
      // 关闭弹框
      this.dialogVisible = false
    },   
  },
}
</script>

<style>

</style>