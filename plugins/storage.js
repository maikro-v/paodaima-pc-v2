import Storage from '@/libs/Storage'
export default (context, inject) => {
  inject('storage', Storage)
}
