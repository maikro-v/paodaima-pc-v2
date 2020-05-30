<template>
  <div class="add">
    <el-form ref="form" :model="forms" :rules="rules" label-width="100px" class="form">
      <el-form-item prop="title" label-width="0" size="medium" class="title">
        <el-input v-model="forms.title" placeholder="输入文章标题" />
      </el-form-item>
      <section class="main">
        <el-form-item prop="content" label-width="0" size="small">
          <no-ssr>
            <mavon-editor v-model="forms.content" class="editor" />
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
          <el-select v-model="forms.tag_id" multiple clearable placeholder="选择所属标签" class="form__item">
            <el-option v-for="(item, index) in tagList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
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
export default {
  layout: 'common',
  data() {
    return {
      forms: {
        title: '',
        content: '',
        image: '',
        classify_id: '',
        description: '',
        tag_id: [],
        is_top: 1,
        is_elite: 1
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { max: 20, message: '标题长度不能大于20个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入图文', trigger: 'blur' }
        ],
        classify_id: [
          { type: 'number', required: true, message: '请选择分类', trigger: 'blur' }
        ],
        tag_id: [
          { type: 'array', required: true, message: '请选择标签', trigger: 'blur' },
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
    ...mapState('tag', ['tagList'])
  },
  created() {
    this.getClassifyList()
    this.getTagList()
  },
  methods: {
    ...mapActions('classify', ['getClassifyList']),
    ...mapActions('tag', ['getTagList']),
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.article.add(this.forms).then((res) => {
            this.$message.success(res.msg)
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
  .editor {
    height: 700px;
  }
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
</style>
