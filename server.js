/**
 * Created by brady on 2019/6/20.
 */
const express = require('express')
const createError = require('http-errors')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { Product, User } = require('./models')

const app = express()

const SECRET = 'qwert'

// 处理跨域
app.use(cors())
// 解析body
app.use(express.json())

// 静态文件托管
app.use('/static', express.static('public'))

// 验证token中间件 authMiddleware
const auth = async (req, res, next) => {
  // 获取请求头中的token
  const token = String(req.headers.authorization).split(' ').pop()
  if (!token) return next(createError(401, '请先登录'))
  // 验证token获取id
  const { id } = jwt.verify(token, SECRET)
  if (!id) return next(createError(401, '请先登录'))
  // 查询用户
  req.user = await User.findById(id)
  if (!req.user) return next(createError(401, '请先登录'))
  next()
}

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

// 注册
app.post('/api/register', async (req, res, next) => {
  if (!req.body.username) return next(createError(422, '请输入用户名'))
  if (!req.body.password) return next(createError(422, '请输入密码'))
  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  })
  res.send(user)
})

// 登录
app.post('/api/login', async (req, res, next) => {
  // 验证用户名
  if (!req.body.username) return next(createError(422, '请输入用户名'))
  const user = await User.findOne({
    username: req.body.username
  })
  if (!user) return next(createError(422, '用户名不存在'))

  // 验证密码
  if (!req.body.password) return next(createError(422, '请输入密码'))
  const isPasswordValid = require('bcrypt').compareSync(req.body.password, user.password)
  if (!isPasswordValid) return next(createError(422, '密码错误'))

  // 生成token
  const token = jwt.sign({
    id: String(user._id),
  }, SECRET)

  res.send({
    user,
    token: token
  })
})

// 获取用户列表
app.get('/api/users', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

// 获取个人信息
app.get('/api/profile', auth, async (req, res) => {
  res.send(req.user)
})

// 错误处理
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).send({
    message: err.message
  })
  next()
})

app.listen(3000, () => {
  console.log('App listening on port 3000')
})
