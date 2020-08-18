<template>
  <div v-show="_value" class="image-cropper">
    <div class="mask" @click="maskClick" />
    <div class="image-cropper-wrap">
      <div class="image-cropper-header row align-center">
        <div class="col">
          <h2 class="image-cropper-header__title">
            图片裁剪
          </h2>
        </div>
        <btn class="image-cropper-header__btn" @click="cancel">
          取消
        </btn>
        <btn class="image-cropper-header__btn" type="primary" @click="confirm">
          保存
        </btn>
      </div>
      <div class="image-cropper-body clear">
        <div class="image-cropper-origin lf">
          <no-ssr>
            <vue-cropper
              :ref="ref"
              :img="img"
              :enlarge="2"
              :auto-crop="true"
              :fixed-box="true"
              :auto-crop-width="cropWidth"
              :auto-crop-height="cropHeight"
              output-type="png"
              @img-moving="getDropData"
              @crop-moving="getDropData"
            />
          </no-ssr>
        </div>
        <div class="image-cropper-preview lf">
          <img :src="previewImg" class="image-cropper-preview__img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import btn from '@/components/btn'
export default {
  components: {
    btn
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    cropWidth: {
      type: Number,
      default: 200
    },
    cropHeight: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      previewImg: '',
      ref: `image-cropper-${(new Date().getTime() + Math.random() * 10000).toFixed(0)}`
    }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    maskClick() {
      console.log(1)
    },
    getDropData(e) {
      this.$refs[this.ref].getCropData((data) => {
        this.previewImg = data
      })
    },
    getDropBase() {
      return this.previewImg
    },
    confirm() {
      this.$emit('confirm', this.previewImg)
      this._value = false
      this.previewImg = ''
    },
    cancel() {
      this.$emit('cancel')
      this._value = false
      this.previewImg = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-cropper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 600;
    pointer-events: none;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 590;
    background: rgba(0, 0, 0, .6);
    pointer-events: auto;
  }
  .image-cropper-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    min-width: 700px;
    z-index: 591;
    background: white;
    border-radius: 4px;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    overflow: hidden;
  }
  .image-cropper-header {
    border-bottom: 1px solid #dddddd;
    &__title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 20px;
    }
    &__btn {
      min-width: 100px;
      height: 60px;
      font-weight: normal;
      border-bottom: none;
      border-top: none;
      border-right: none;
    }
  }
  .image-cropper-body {
    height: 500px;
    @include mosaic;
  }
  .image-cropper-origin,
  .image-cropper-preview {
    position: relative;
    height: 100%;
    width: 50%;
    overflow: hidden;
  }
  .image-cropper-preview {
    width: 50%;
    border-left: 4px solid #999999;
    background: rgba(0, 0, 0, .5);
    &__img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 90%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 4px rgba(255, 255, 255, .4);
      @include mosaic;
    }
  }
</style>
