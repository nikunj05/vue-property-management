export default function auth(to, from, next) {
  if (localStorage.getItem('token')) {
    //this.$forceUpdate();
    return next()
  } else {
    next({ name: 'login' })
  }
}
