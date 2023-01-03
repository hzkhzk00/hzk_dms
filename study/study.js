// 1.引入express
const express = require('express');

// 2.创建应用对象
const app = express();

app.use(express.static('/hzk_dms/study'));

//3.创建路由规则
app.get('/server', (request,response) => {
    // 设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')


    //设置响应体
    response.send('HELLO EXPRESS')
});


// app.get('/server', (request,response) => {
//     response.sendFile('GET.html', { root: '/hzk_dms/study' });
// });


app.post('/server', (request, response) => {
    // 设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')


    //设置响应体
    response.send('HELLO EXPRESS POST')
});


// 4.监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动,8000端口监听中....")
});