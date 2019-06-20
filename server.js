/**
 * Created by brady on 2019/6/20.
 */
const express = require('express');

const app = express();

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
