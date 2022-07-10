export const setToken = (token) => {
  // 用来存储token值
  localStorage.setItem('TOKEN',token)
}

// 用来获取token，不需要传递参数
export const getToken = () => {
 return localStorage.getItem('TOKEN')
}
//清除本地的token的值
export const removeToken = ()=>{
  return localStorage.removeItem('TOKEN')
}