function auth(next) {
  console.log('ji')
  const token = localStorage.getItem('token')
  console.log(token, 'o')
  if (!token) {
    return next({
      name: 'login',
    })
  }

  return next()
}

export default auth
