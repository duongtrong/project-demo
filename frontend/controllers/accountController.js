var Account = require('../models/account');
require('mongoose-pagination');
var bcrypt = require('bcrypt');
var saltRounds = 10;

exports.getList = function(req, resp){
	// Lấy tham số và parse ra number.
	console.log('Page: ' + req.query.page);
	console.log('Limit: ' + req.query.limit);
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);

	Account.find({'status': 1})
	.paginate(page, limit, function(err, result, total) {
    	console.log('total: ', total, 'result: ', result);
    	var responseData = {
    		'list': result,
    		'totalPage': Math.ceil(total/limit)
    	};
    	resp.send(responseData);
  	});
}

exports.getDetail = function(req, resp){	
	Account.findOne({ _id: req.params.id, 'status': 1 },function(err, result){		
		console.log('obj.password: ' + req.query.password);
		console.log('result.password: ' + result.password);
		bcrypt.compare(req.query.password, result.password, function(err, isMatch){
			console.log('isMatch: ' + isMatch);
		});
		resp.send(result);
	});
}

exports.add = function(req, resp){
	// mã hoá password.
	var obj = new Account(req.body);
	bcrypt.hash(obj.password, bcrypt.genSaltSync(saltRounds), function(err, hash){
		obj.password = hash;
		obj.save(function(err){
			resp.send(obj);
		});
	});
}

exports.update = function(req, resp){
	bcrypt.hash(req.body.password, bcrypt.genSaltSync(saltRounds), function(err, hash){
		req.body.password = hash;		
		Account.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, result) {		
		    resp.json(result);
		});	
	});
}

exports.delete = function(req, resp){	
	Account.findById(req.params.id,function(err, result){				
		result.status = 0;
		Account.findOneAndUpdate({_id: req.params.id}, result, {new: true}, function(err, result) {
		    resp.json(result);
		});
	});	
}