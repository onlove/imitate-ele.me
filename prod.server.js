/**
 * Created by DT274 on 2017/7/5.
 */
var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function(req, res, next) {
  req.url = './index.html';
  next();
});
app.use(router);

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoute = express.Router();

apiRoute.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
});
apiRoute.get('/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  })
});
apiRoute.get('/ratings', function(req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
});

app.use('/api', apiRoute);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})

