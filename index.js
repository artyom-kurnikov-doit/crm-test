const express = require('express');

const app = express();

app.use(express.static('public'));

app.listen(8080, err => {
  console.log(err || 'Server is up');
});
