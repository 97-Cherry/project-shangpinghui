import Mock from 'mockjs';
//引入mock数据json数据
import banner from './banner.json';
import floor from './floor.json'
//webpack对外暴露的存在图片，json数据格式，不向js数据文件，一定会对外暴露
Mock.mock('/mock/banner',{code:200,data:banner
});//第一个参数是请求的地址，第二个参数请求的数据
Mock.mock('/mock/floor', { code: 200, data: floor });