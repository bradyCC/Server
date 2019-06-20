/**
 * Created by brady on 2019/6/20.
 */
const express = require('express');
const cors = require('cors');

const app = express();

// 处理跨域
app.use(cors())
// 静态文件托管
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.send({path: 'Home'});
});

app.get('/about', (req, res) => {
  res.send({path: 'About Us'});
})

app.get('/products', (req, res) => {
  res.send([
    {id: 1, title: 'Product A'},
    {id: 2, title: 'Product B'},
    {id: 3, title: 'Product C'},
  ])
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
