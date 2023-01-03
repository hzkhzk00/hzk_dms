// 引入express（服务端口监听）
const express = require('express');

// 引入cors（解决跨域访问）
const cors = require('cors');

// 引入MySQL存储用户注册数据
const mysql = require('mysql');


const bodyParser = require('body-parser');

// 创建express应用对象
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('home'));

// MySQL连接配置
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users',
});

//连接MySQL8
connection.connect((error) => {
    if (error) {
        console.error(error);
    } else {
        console.log('MySQLl8连接成功');
    }
});

// 创建home访问GET
app.get('/home', (req, res) => {
    res.sendFile('home.html', { root: 'home' });
});

// 创建login访问GET
app.get('/home/login', (req, res) => {
    res.sendFile('login.html', { root: 'home' });
});

// 创建register访问GET
app.get('/home/register', (req, res) => {
    res.sendFile('register.html', { root: 'home' });
});


// 创建登录路由规则POST
app.post('/home/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ message: '发生错误' });
        } else if (result.length > 0) {
            res.send({ message: '登录成功' });
        } else {
            res.status(401).send({ message: '邮件或密码无效' });
        }
    });
});

// 创建注册路由规则POST
app.post('/home/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: '发生错误' });
            return;
        }

        res.json({ message: '用户注册成功' });
    });
});


// 监听端口启动服务
app.listen(8001, () => {
    console.log('服务已经启动,8001端口监听中....');
});