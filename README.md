# Mongodb操作

## 一、配置
> 安装mongod
```
https://www.mongodb.com/download-center
```
>  安装mongoose
```
npm i mongoose
```

## 二、连接mongodb数据库
> 引入mongoose
```javascript
const mongoose = require('mongoose')
```

> 连接数据库
```javascript
mongoose.connect('mongodb://localhost:27017/express', {useNewUrlParser: true})
```

## 三、创建模型
> 创建模型
```javascript
const Product = mongoose.model('Product', new mongoose.Schema({title: String,}), 'products')
```

## 四、基本使用
```javascript
// 查询
Product.find()

// 全部删除
Product.deleteMany({})

// 批量插入
Product.insertMany([])

```

