<template>
  <div class="components-container" style='height:100vh'>
    <el-card>
      <div class="workticket">
        <el-card>
          <div slot="header" class="clearfix">
            <a class="title">{{ticketData.name}}</a>
            <hr class="heng"/>

            <div class="appendInfo">
              <a class="ticketinfo create_user"><span class="han">
                                工单创建时间：</span>{{ticketData.create_time | parseDate}}</a>
              <a class="ticketinfo create_user"><span class="han">
                              <a class="shu"></a>
                                工单发起人：</span>{{ticketData.create_user}}</a>
              <a class="ticketinfo action_user"><span class="han">
                              <a class="shu"></a>
                               工单指派者：</span>{{ticketData.action_user}}</a>
              <a class="ticketinfo action_user" v-if="ticketData.ticket_status!=0">
                <a class="shu"></a>
                <span class="han">最新回复人：</span>{{ticketData.edit_user}}</a>
              <a class="shu"></a>
              <span class="han">工单类型：</span>
              <a>{{ticketData.type}}</a>
              <a class="shu"></a>
              <span class="han">工单当前状态：</span>
              <el-tag :type="STATUS_TYPE[ticketData.ticket_status]">
                {{STATUS_TEXT[ticketData.ticket_status]}}
              </el-tag>
            </div>
            <div class="appendInfo" v-if="ticketData.ticket_status!=2">
              <span class="han">工单操作：</span>
              <el-button v-if="role==='super'&&ticketData.ticket_status===0" type="success" size="small"
                         @click="changeStatus">接收
              </el-button>
              <router-link v-if="workticketlist_btn_edit||role==='super'" :to="'/worktickets/copyworkticket/' + pid">
                <el-button type="primary" size="small">乾坤大挪移</el-button>
              </router-link>
              <div class="action">
                <el-radio-group v-model="radio_status">
                  <el-radio label="0">不操作</el-radio>
                  <el-radio label="2">关闭工单</el-radio>
                  <el-radio v-if="role==='super'" label="1">更改指派人</el-radio>
                </el-radio-group>
                <div class="action" v-if="radio_status==1">
                  <el-select v-model="rowdata.action_user" filterable placeholder="请选择指派人">
                    <el-option v-for="item in users" :key="item.id" :value="item.username"></el-option>
                  </el-select>
                </div>
              </div>

            </div>
          </div>

          <vue-markdown :source="ticketData.content"></vue-markdown>

          <div v-if="ticketData.ticket_status<2">
            <hr class="heng"/>
            <el-upload
              ref="upload"
              :action="uploadurl"
              :on-success="handleSuccess"
              :show-file-list="false">
              <el-button slot="trigger" size="mini" type="danger" plain icon="upload2" :disabled="count>2">
                上传附件
              </el-button>
              <div slot="tip" class="el-upload__tip">
                <p>上传文件不超过10m，<a style="color: red">最多只能上传3个文件</a></p>
              </div>
            </el-upload>
            <hr class="heng"/>
          </div>

          <div v-if='enclosureData.length>0' class="ticketenclosure">
            <ul>
              <li v-for="item in enclosureData" :key="item.id" v-if="item.file" style="list-style:none">
                <i class="fa fa-paperclip"></i>
                <a :href="apiurl + '/upload/' + item.file" :download="item.file">{{item.file.split('/')[1]}}</a>
                <el-button type="text" icon="el-icon-delete"
                           @click="deleteEnclosure(item.id)"></el-button>
              </li>
            </ul>
          </div>
        </el-card>
      </div>

      <div v-if="ticketData.ticket_status<2">
        <el-form :model="commentForm" ref="mailcontent" label-width="80px">
          <hr class="heng"/>
          <el-form-item label="问题处理" prop="content">
            <mavon-editor style="z-index: 1" v-model="mailcontent" code_style="monokai" :toolbars="toolbars"
                          @imgAdd="imgAdd" ref="md"></mavon-editor>
            <a class="tips"> Tip：截图可以直接 Ctrl + v 粘贴到问题处理里面</a>
          </el-form-item>
          <el-form-item v-if="radio_status === '0'" label="通知人" prop="action_user">
            <el-select v-model="ticketData.create_user" filterable placeholder="请选择通知人">
              <el-option v-for="item in users" :key="item.id" :value="item.username"></el-option>
            </el-select>
            <el-checkbox v-model="sendnotice">发送通知</el-checkbox>
          </el-form-item>
          <el-form-item v-if="radio_status === '0'" label="通知运维">
            <el-checkbox v-model="sendop"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-card class="ticketcomment" v-if="commentData.length>0">
        处理历史记录
        <div v-for="item in commentData" :key="item.id">
          <hr class="heng"/>
          <el-row>
            <el-col :span="1">
              <el-button type="primary" plain class="commentuser">{{item.create_user}}</el-button>
            </el-col>
            <el-col :span="20">
              <div class="dialog-box">
                <span class="bot"></span>
                <span class="top"></span>
                <div class="comment">
                  <vue-markdown :source="item.content"></vue-markdown>
                  <p class="commenttime">处理时间：{{item.create_time | parseDate}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import {
  getWorkticket,
  patchWorkticket,
  getTicketcomment,
  postTicketcomment,
  postTicketenclosure,
  getTicketenclosure,
  deleteTicketenclosure
} from 'api/workticket'
import { postUpload, postSendmessage } from 'api/tool'
import { apiUrl, uploadurl } from '@/config'
import VueMarkdown from 'vue-markdown' // 前端解析markdown
import { getUser } from 'api/user'
import { mapGetters } from 'vuex'
import { getConversionTime } from '@/utils'

export default {
  components: { VueMarkdown },

  data() {
    return {
      route_path: this.$route.path.split('/'),
      pid: this.$route.params.pid,
      ticket_id: '',
      ticketData: {},
      commentData: {},
      enclosureData: {},
      apiurl: apiUrl,
      commentForm: {
        ticket: '',
        create_user: localStorage.getItem('username'),
        content: '【问题处理】'
      },
      enclosureForm: {
        ticket: '',
        create_user: localStorage.getItem('username'),
        file: ''
      },
      rowdata: {
        action_user: '',
        edit_user: ''
      },
      count: 0,
      toolbars: {
        preview: true, // 预览
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        ol: true, // 有序列表
        help: true
      },
      users: [],
      uploadurl: uploadurl,
      STATUS_TEXT: { '0': '未接收', '1': '正在处理', '2': '已完成', '3': '搁置' },
      STATUS_TYPE: { '0': 'danger', '1': 'success', '2': 'info', '3': 'warning' },
      radio_status: '0',
      mailcontent: '',
      sendnotice: false,
      sendop: true,
      selectcopy: false,
      workticketlist_btn_edit: false
    }
  },

  computed: {
    ...mapGetters([
      'role',
      'elements',
      'username'
    ])
  },

  created() {
    this.workticketlist_btn_edit = this.elements['编辑工单-编辑工单按钮']
    this.fetchData()
    this.CommentData()
    this.EnclosureData()
    this.getUsers()
  },
  methods: {
    fetchData() {
      const parms = {
        pid: this.pid
      }
      getWorkticket(parms).then(response => {
        this.ticketData = response.data[0]
        this.ticket_id = this.ticketData.id
        this.rowdata.action_user = this.ticketData.action_user
        this.rowdata.edit_user = this.ticketData.edit_user
      })
    },
    CommentData() {
      const parms = {
        ticket__pid: this.pid
      }
      getTicketcomment(parms).then(response => {
        this.commentData = response.data
      })
      this.commentForm.content = ''
    },
    EnclosureData() {
      const parms = {
        ticket__pid: this.pid
      }
      getTicketenclosure(parms).then(response => {
        this.enclosureData = response.data
        this.count = response.data.length
      })
    },
    deleteEnclosure(id) {
      deleteTicketenclosure(id)
      setTimeout(this.EnclosureData, 1000)
    },
    changeStatus() {
      const data = {
        ticket_status: 1,
        action_user: localStorage.getItem('username')
      }
      patchWorkticket(this.ticket_id, data).then(() => {
        this.fetchData()
      })
    },
    submitForm(formName) {
      this.$confirm('你的操作即将提交，提交完成后会立即跳转到工单列表页面!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(response => {
        this.commentForm.ticket = this.ticket_id
        this.rowdata.edit_user = this.commentForm.create_user
        if (this.radio_status === '1') {
          this.commentForm.content = '【工单状态变化】工单被' + this.commentForm.create_user + '重新指派给' + this.rowdata.action_user + ',' + this.mailcontent
          const messageForm = {
            action_user: this.rowdata.action_user,
            title: '【工单更换指派人】' + this.ticketData.name,
            message: `指派人: ${this.rowdata.action_user}\n工单地址: ${window.location.href}`
          }
          postSendmessage(messageForm)
        } else if (this.radio_status === '2') {
          this.rowdata.ticket_status = this.ticketData.ticket_status = this.radio_status
          this.commentForm.content = '【工单状态变化】工单被' + this.commentForm.create_user + '关闭！' + this.mailcontent

          const messageForm = {
            action_user: this.ticketData.create_user,
            title: '【工单已完成】' + this.ticketData.name,
            message: `指派人: ${this.ticketData.action_user}\n工单地址: ${window.location.href}`
          }
          postSendmessage(messageForm)
        } else {
          this.commentForm.content = '【问题处理】' + this.mailcontent
          if (this.sendnotice) {
            const messageForm = {
              action_user: this.ticketData.create_user,
              title: '【工单有新回复】' + this.ticketData.name,
              message: `指派人: ${this.ticketData.action_user}\n工单地址: ${window.location.href}`
            }
            postSendmessage(messageForm)
          }
          if (this.sendop) {
            const messageForm = {
              action_user: 'admin',
              title: '【工单有新回复】' + this.ticketData.name,
              message: `指派人: ${this.ticketData.action_user}\n工单地址: ${window.location.href}`
            }
            postSendmessage(messageForm)
          }
        }
        postTicketcomment(this.commentForm).then(response => {
          this.patchForm(this.rowdata)
          this.$router.push('/worktickets/workticket')
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '已取消本次操作'
        })
      })
    },
    patchForm(rowdata) {
      patchWorkticket(this.ticket_id, rowdata)
    },
    handleSuccess(file, fileList) {
      const formData = new FormData()
      formData.append('username', this.enclosureForm.create_user)
      formData.append('file', fileList.raw)
      formData.append('create_time', getConversionTime(fileList.uid))
      formData.append('type', fileList.raw.type)
      formData.append('archive', this.route_path[1])
      postUpload(formData).then(response => {
        this.enclosureForm.file = response.data.filepath
        this.enclosureForm.ticket = this.ticket_id
        postTicketenclosure(this.enclosureForm)
        setTimeout(this.EnclosureData, 1000)
        if (response.statusText === 'Created') {
          this.$message({
            type: 'success',
            message: '恭喜你，上传成功'
          })
        }
      }).catch(error => {
        this.$message.error('上传失败')
        this.$refs.upload.clearFiles()
        console.log(error)
      })
    },
    imgAdd(pos, file) {
      var md = this.$refs.md
      const formData = new FormData()
      formData.append('username', this.username)
      formData.append('file', file)
      formData.append('create_time', getConversionTime(file.lastModified))
      formData.append('type', file.type)
      formData.append('archive', this.route_path[1])
      postUpload(formData).then(response => {
        md.$imglst2Url([[pos, response.data.file]])
      })
    },
    getUsers() {
      getUser().then(response => {
        this.users = response.data
      })
    }
  }
}
</script>

<style lang='scss'>
  .editticket {
    margin: 50px;
    width: 80%;
  }

  .title {
    font-size: 28px;
    font-weight: 700;
    padding-left: 10px;
  }

  .appendInfo {
    padding: 5px;
    margin: 5px;
  }

  .action {
    display: inline;
    margin-left: 20px;
  }

  .han {
    margin-left: 5px;
  }

  .content {
    margin: 20px 5px;
  }

  .ticketcomment {
    margin-top: 20px;
    background-color: rgba(48, 250, 81, 0.17);
    .dialog-box {
      position: relative;
      left: 100px;
      margin-left: -30px;
      span {
        width: 0;
        height: 0;
        font-size: 0;
        overflow: hidden;
        position: absolute;
        &.bot {
          border-width: 16px;
          border-style: solid dashed dashed;
          border-color: transparent rgba(48, 250, 81, 0.38) transparent transparent;
          top: 10px;
          left: -30px;
        }
      }
      .comment {
        border: solid 1px rgba(255, 164, 186, 0.62);
        padding: 6px;
        margin-bottom: 10px;
        min-height: 50px;
        .commenttime {
          float: right;
        }
      }
    }
  }
</style>
