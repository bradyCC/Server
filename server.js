/**
 * Created by brady on 2019/6/20.
 */
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send([
    { user: 'Lucy' },
    { data: [] },
  ]);
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
