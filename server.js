/**
 * Created by brady on 2019/6/20.
 */
const express = require('express')

const app = express()

// 连接mongodb数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express', {useNewUrlParser: true})

// 创建model模型
const Product = mongoose.model('Product', new mongoose.Schema({title: String}), 'products')

const cors = require('cors')
// 处理跨域
app.use(cors())
// 解析body
app.use(express.json())

// 静态文件托管
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.send({path: 'Home'})
})

app.get('/about', (req, res) => {
  res.send({path: 'About Us'})
})

// 获取产品列表
app.get('/products', async (req, res) => {
  const data = await Product.find()
  res.send(data)
})

// 获取产品详情
app.get('/products/:id', async (req, res) => {
  const data = await Product.findById(req.params.id)
  res.send(data)
})

// 新增产品
app.post('/products', async (req, res) => {
  const data = req.body
  const product = await Product.create(data)
  res.send(product)
})

// 编辑产品
app.put('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  product.title = req.body.title
  await product.save()
  res.send(product)
})

// 删除产品
app.delete('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  await product.remove()
  res.send({success: true})
})

app.listen(3000, () => {
  console.log('App listening on port 3000')
})
