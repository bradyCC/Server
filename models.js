/**
 * Created by brady on 2019/6/21.
 */

// 连接mongodb数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express', {
  useCreateIndex: true, // 创建唯一键
  useNewUrlParser: true
})

// 创建模型
const ProductSchema = new mongoose.Schema(
  {title: String}
)
const Product = mongoose.model('Product', ProductSchema, 'products')

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true }, // 设置唯一键
  password: {
    type: String,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
})
const User = mongoose.model('User', UserSchema, 'users')

// User.db.dropCollection('users')

module.exports = { Product, User }
