/**
 * Created by brady on 2019/6/20.
 */
const express = require('express')

const app = express()

// 操作mongodb数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express', {useNewUrlParser: true})
// 创建模型
const Product = mongoose.model('Product', new mongoose.Schema({
  title: String,
}), 'products')

// Product.insertMany([
//   {title: '产品1'},
//   {title: '产品2'},
//   {title: '产品3'},
// ])

const cors = require('cors')
// 处理跨域
app.use(cors())

// 静态文件托管
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.send({path: 'Home'});
})

app.get('/about', (req, res) => {
  res.send({path: 'About Us'});
})

app.get('/products', async (req, res) => {
  const data = await Product.find()
  res.send(data)
});

app.listen(3000, () => {
  console.log('App listening on port 3000')
})
