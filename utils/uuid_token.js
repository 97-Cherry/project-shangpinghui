// 游客的用户信息
import { v4 as uuidv4 } from 'uuid'
// 需要随机生成一个字符串，一旦生成了一个字符串之后，游客的身份信息就将永久的存储
export const getUUID = () => {

  // 首先判断本地存储中是否存在uuid的值
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  // 如果本地中没有生成，就生成
  if (!uuid_token) {
    // 就开始生成游客的临时身份
    uuid_token = uuidv4();
    // 在本地存储中执行一次
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  // 返回身份信息
  return uuid_token;
  // uuid_token可以存储在本地了，需要数据带给服务器
  
}