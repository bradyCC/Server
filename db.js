/**
 * Created by brady on 2019/6/21.
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongo-relation', {useNewUrlParser: true})

const CategorySchema = new mongoose.Schema({
  name: { type: String },
}, {
  // "toJSON": { virtuals: true }
})
// 设置虚拟键，用于关联
CategorySchema.virtual('posts', {
  localField: '_id', // 本地键
  ref: 'Post',  // 参考模型
  foreignField: 'categories', // 参考模型键
  justOne: false, // 设置查找数据是否为一条
})
const Category = mongoose.model('Category', CategorySchema)

// 使用id、ref设置关联
const Post = mongoose.model('Post', new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
}))

let main = async () => {
  // 创建分类
  // await Category.deleteMany({})
  // await Category.insertMany([
  //   {name: 'nodejs'},
  //   {name: 'vuejs'}
  // ])
  // const categories = await Category.find()
  // console.log(categories)

  // 创建文章
  // await Post.deleteMany({})
  // await Post.insertMany([
  //   {title: '第一篇文章', body: '内容一'},
  //   {title: '第二篇文章', body: '内容二'},
  //   {title: '第三篇文章', body: '内容三'},
  // ])
  // const posts = await Post.find()
  // console.log(posts)

  // 设置关联
  // const cat1 = await Category.findOne({name: 'nodejs'})
  // const cats = await Category.find()
  // const posts = await Post.find()
  // for (let post of posts) {
  //   post.category = cat1
  //   post.categories = [...cats]
  //   post.save()
  // }
  // console.log(await Post.find().populate('categories'))

  const cats = await Category.find().populate('posts').lean()
  console.log(cats)
  // console.log(JSON.stringify(cats))
}
main()
