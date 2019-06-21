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

## 三、创建Model模型
> 创建模型
```javascript
const Product = mongoose.model('Product', new mongoose.Schema({title: String,}), 'products')
```

## 四、基本使用
```
// 查询
Product.find() // 全部查询
Product.find().skip(1).limit(2) // 跳过、限制查询 - 多用于分页
Product.find().where({title: '产品2'}) // 条件查询
Product.find().sort({_id: 1}) // 排序 1-正序 2-倒序
Product.findOne({_id: req.params.id}) // URL传参查询
Product.findById(req.params.id) // ID查询


// 全部删除
Product.deleteMany({})

// 批量插入
Product.insertMany([])


```

