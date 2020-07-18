<template>
  <div class="add">
    <el-form ref="form" :model="forms" :rules="rules" label-width="100px" class="form">
      <el-form-item prop="title" label-width="0" size="medium" class="title">
        <el-input v-model="forms.title" placeholder="输入文章标题" />
      </el-form-item>
      <section class="main">
        <el-form-item prop="content" label-width="0" size="small">
          <no-ssr>
            <markdown-editor
              v-model="forms.content"
              ref="editor"
              class="editor"
              @imgAdd="handleImgAdd"
            />
          </no-ssr>
        </el-form-item>
        <el-form-item label="封面图：" size="small">
          <el-upload
            drag
            :show-file-list="false"
            :before-upload="beforeUpload"
            action="/api/upload"
            class="upload-demo"
          >
            <img v-if="forms.image" :src="forms.image" class="upload__img">
            <div v-else class="upload-text">
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </div>
            <div slot="tip" class="el-upload__tip">
              建议尺寸为320*180像素或同比例的jpg/png/git文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="classify_id" label="分类：" size="small">
          <el-select v-model="forms.classify_id" clearable placeholder="选择文章分类" class="form__item">
            <el-option v-for="(item, index) in classifyList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="tag_id" label="标签：" size="small">
          <el-select
            v-model="forms.tag_id"
            multiple
            clearable
            filterable
            :multiple-limit="6"
            placeholder="选择所属标签"
            class="form__item"
          >
            <el-option v-for="(item, index) in tagList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <el-popover
            v-model="isShowAddTag"
            placement="top"
            width="240"
            title="添加标签"
          >
            <p class="hint">添加标签前，前先在左侧下拉框中搜索是否有存在的标签，以免重复添加</p>
            <el-input v-model="tempTag" placeholder="输入标签名称" />
            <div style="text-align: right; margin: 10px 0;">
              <el-button size="mini" type="text" @click="isShowAddTag = false">
                取消
              </el-button>
              <el-button type="primary" size="mini" :loading="addTagLoading" @click="handleAddTag">
                确定
              </el-button>
            </div>
            <el-button slot="reference" type="primary">
              自定义标签
            </el-button>
          </el-popover>
        </el-form-item>
        <el-form-item prop="description" label="文章描述：" size="small">
          <el-input
            v-model="forms.description"
            type="textarea"
            :rows="7"
            :maxlength="250"
            show-word-limit
            placeholder="输入描述"
            class="form__item"
          />
        </el-form-item>
        <el-form-item prop="is_elite" label="状态：" size="small">
          <el-radio-group v-model="forms.status">
            <el-radio :label="2">
              上架
            </el-radio>
            <el-radio :label="1">
              下架
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="is_elite" label="推荐：" size="small">
          <el-radio-group v-model="forms.is_elite">
            <el-radio :label="2">
              推荐
            </el-radio>
            <el-radio :label="1">
              不推荐
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="is_top" label="顶置：" size="small">
          <el-radio-group v-model="forms.is_top">
            <el-radio :label="2">
              顶置
            </el-radio>
            <el-radio :label="1">
              不顶置
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </section>
    </el-form>
    <footer class="footer">
      <el-button type="primary" size="small" @click="submit('form')">
        保存并发布
      </el-button>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import markdownEditor from '@/components/markdown-editor'
// import MarkdownNice from 'markdown-nice'
export default {
  layout: 'common',
  middleware: 'accountVerify',
  components: { markdownEditor },
  head() {
    return {
      title: '文章编辑'
    }
  },
  data() {
    return {
      tempTag: '',
      isShowAddTag: false,
      addTagLoading: false,
      forms: {
        id: null,
        title: '',
        content: '',
        image: '',
        classify_id: '',
        description: '',
        tag_id: [],
        is_top: 1,
        status: 2,
        is_elite: 1
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { max: 50, message: '标题长度不能大于20个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入图文', trigger: 'blur' }
        ],
        classify_id: [
          { type: 'number', required: true, message: '请选择分类', trigger: 'blur' }
        ],
        tag_id: [
          { type: 'array', required: true, message: '请选择标签', trigger: 'change' },
          { type: 'array', max: 6, min: 1, message: '标签在1 - 6个之间', trigger: 'change' }
        ],
        is_top: [
          { type: 'number', required: true, message: '选项不能为空', trigger: 'blur' }
        ],
        is_elite: [
          { type: 'number', required: true, message: '选项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('classify', ['classifyList']),
    ...mapState('tag', ['tagList']),
    $editor() {
      return this.$refs.editor
    }
  },
  created() {
    if (this.$route.query.id) {
      this.forms.id = this.$route.query.id
      this.getData()
    }
    this.getClassifyAll()
    this.getTagList()
  },
  methods: {
    ...mapActions('classify', ['getClassifyAll']),
    ...mapActions('tag', ['getTagList']),
    handleImgAdd(filename, imgfile) {
      const formData = new FormData()
      formData.append('files', imgfile)
      this.$api.upload.upload(formData).then(({ data }) => {
        this.$editor.$img2Url(filename, data[0].url)
      }).catch((err) => {
        this.$notify.error({
          title: '错误',
          message: err
        })
      })
    },
    handleAddTag() {
      this.addTagLoading = true
      this.$api.tag.add({
        name: this.tempTag
      }).then(({ data }) => {
        return this.getTagList().then(() => {
          return data
        })
      }).then((data) => {
        this.$message.success('标签添加成功')
        this.forms.tag_id.push(data.id)
        this.isShowAddTag = false
        this.tempTag = ''
      }).catch((err) => {
        this.$notify.error({
          title: '错误',
          message: err
        })
      }).finally(() => {
        this.addTagLoading = false
      })
    },
    getData() {
      this.$api.article.detail(this.forms.id).then(({ data }) => {
        this.forms = { ...this.forms, ...data }
      }).catch((err) => {
        this.$notify.error({
          title: '错误',
          message: err
        })
      })
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const target = this.forms.id ? this.$api.article.update(this.forms) : this.$api.article.add(this.forms)
          target.then((res) => {
            if (this.forms.id) {
              this.$message.success('修改成功')
              this.$router.go(-1)
            } else {
              this.$confirm('添加成功，是否继续添加?', '提示', {
                confirmButtonText: '继续',
                cancelButtonText: '返回',
                type: 'success'
              }).then(() => {
                this.resetForm(formName)
              }).catch(() => {
                this.$router.go(-1)
              })
            }
          }).catch((err) => {
            this.$notify.error({
              title: '错误',
              message: err
            })
          })
        } else {
          return false
        }
      })
    },
    resetForm(name) {
      this.$refs[name].resetFields()
    },
    beforeUpload(res) {
      const formdata = new FormData()
      formdata.append('files', res)
      this.$api.upload.upload(formdata).then(({ data }) => {
        this.forms.image = data[0].url
      }).catch((err) => {
        this.$notify.error({
          title: '错误',
          message: err
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .add {
    @include container;
    padding: 10px 0 70px;
  }
  .main {
    background: white;
    padding-bottom: 70px;
    border-radius: 6px;
  }
  /*/deep/ .editor {*/
  /*  height: 700px;*/
  /*  line-height: normal !important;*/
  /*  z-index: 99;*/
  /*  & * {*/
  /*    line-height: 2 !important;*/
  /*    max-width: 100%;*/
  /*  }*/
  /*}*/
  .form {
    &__item {
      width: 360px;
    }
    & .title {
      margin-bottom: 18px;
    }
  }
  .tag {
    &__item {
      margin-right: 10px;
    }
  }
  .upload {
    &__img {
      width: 100%;
      height: 100%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
    text-align: center;
    z-index: 9999;
  }
  .hint {
    font-size: 12px;
    color: #d53f41;
  }
</style>
