
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');

/* 通过net模块与相机软件进行tcp通讯 */
var tcp_client=require('./public/javascripts/tcp_client');      //与相机通讯

/* 引入路由模块进行数据交互api以及html页面page */
var page = require('./route.page');
var api = require('./route.api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

/* 初始化 连接mongodb数据库 */
require('./public/javascripts/init');

/* 和相机进行通讯，并且读取数据 */
tcp_client();

app.use('/', page);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
