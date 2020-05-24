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
        <el-form-item prop="image" label="封面图：" size="small">
          <el-upload
            class="upload-demo"
            drag
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="forms.image" :src="forms.image" class="upload-img">
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
        <el-form-item prop="type" label="分类：" size="small">
          <el-select v-model="forms.classify_id" clearable placeholder="选择文章类型" class="form__item">
            <!-- <el-option v-for="(item, index) in classifyList" :key="index" :label="item.name" :value="item.id" /> -->
          </el-select>
        </el-form-item>
        <el-form-item prop="tagList" label="标签：" size="small">
          <el-select v-model="forms.tag_id" multiple clearable placeholder="选择文章类型" class="form__item">
            <!-- <el-option :label="item.name" :value="item.id" v-for="(item, index) in tagList" :key="index"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item prop="describe" label="文章描述：" size="small">
          <el-input
            v-model="forms.describe"
            type="textarea"
            :rows="7"
            :maxlength="250"
            show-word-limit
            placeholder="输入描述"
            class="form__item"
          />
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
import { mapState } from 'vuex'

export default {
  layout: 'common',
  data() {
    const validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入标题'))
      } else {
        if (this.forms.title !== '') {
          this.$refs.form.validateField()
        }
        callback()
      }
    }
    const validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入文章内容'))
      } else {
        if (this.forms.content !== '') {
          this.$refs.form.validateField()
        }
        callback()
      }
    }
    return {
      typeData: [],
      tagList: [],
      handbook: '',
      forms: {
        title: '',
        content: '',
        image: '',
        type: null,
        classify_id: '',
        describe: '',
        tag_id: []
      },
      rules: {
        title: [
          { validator: validateTitle, trigger: 'blur' }
        ],
        content: [
          { validator: validateContent, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('classify', ['classifyList'])
  },
  created() {
    // tagList().then((res) => {
    //   this.tagList = res.data
    // })
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          add({ ...this.forms, tag_id: this.forms.tag_id }).then((res) => {
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
    addArticle() {

    },
    handleUploadSuccess() {
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
