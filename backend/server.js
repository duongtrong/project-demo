const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Kết nối database.
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
mongoose.connect('mongodb://localhost/student_manager', { useMongoClient: true });
mongoose.Promise = global.Promise;

var app = express();

app.use(cors());
app.use(fileUpload());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('./public'));

var applicationRoute = require('./routes/applicationRoute');
applicationRoute(app);

app.listen(3000, function(){
	console.log('Port 3000: everything is going to be 200 OK!');
});

