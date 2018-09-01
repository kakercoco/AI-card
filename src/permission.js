import router from './router'

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
