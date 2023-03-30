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

      </el-form>
    </div> -->



    <mavon-editor
      v-model="content"
      style="height:calc(100vh - 260px)"
    />
    <el-row style="display:flex; margin-left: 48%; margin-top: 15px;">
      <!-- <el-button type="danger" size="large" @click="updateState(activityVO.id)"> 封禁 </el-button> -->
      <el-button v-if="activityVO.activityState === 0" type="danger" size="medium" @click="updateState(activityVO.id)" > 封禁 </el-button>
      <el-button v-if="activityVO.activityState === 1" type="success" size="medium" @click="updateState(activityVO.id)" > 解封 </el-button>
    </el-row>

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
      activityVO: {},
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
    this.content = this.$route.params.activityVO.activityDetail + [formatImageUrlList]

    // 初始化activityVO，便于封禁显示相关信息
    this.activityVO = this.$route.params.activityVO
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
      if (this.activityVO.activityState === 1) {
        this.activityVO.activityState = 0
      } else {
        this.activityVO.activityState = 1
      }
      
      topic.updateState({"type": 1, "activity": this.activityVO}).then(response => {
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