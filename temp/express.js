var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname);
app.use('/dist', express.static(__dirname + '/../dist'));
console.log(__dirname + '/../dist');
app.get('/', function(req,res){
  res.render('index.html');
});

var server = app.listen(3000, function(){
  console.log("Express server has started on port 3000");
});