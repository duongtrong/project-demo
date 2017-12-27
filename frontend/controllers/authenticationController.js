var Account = require('../models/account');
var Credential = require('../models/credential');
require('mongoose-pagination');
var bcrypt = require('bcrypt');
var saltRounds = 10;

// Xử lý đăng nhập.
exports.authentication = function(req, resp){	
	Account.findOne({ username: req.body.username, 'status': 1 },function(err, result){				
		bcrypt.compare(req.body.password, result.password, function(err, isMatch){
			console.log('isMatch: ' + isMatch);
			if(isMatch){
				var obj = new Credential({
					accountId: result._id,
					tokenKey: generateTokenString(),					
				});
				obj.save(function(err){				
					resp.send(obj);
				});				
			}
		});
	});
		
	// Check username password gửi lên.
	// Password mã hoá và check.
	

	// Tạo credential mới, tokenKey random.
}

exports.checkToken = function(tokenKey){
	console.log('tokenKey: ' + tokenKey);
	Credential.findOne({ tokenKey: tokenKey, 'status': 1 },function(err, result){
		console.log('result token: ' + result);
		if(err){
			return false;
		}else{
			return true;			
		}
	});	
}

function generateTokenString(){
	var randomString = 'abcd1234';
	return randomString;
}

exports.delete = function(req, resp){	
	Credential.findById(req.params.id,function(err, result){				
		result.status = 0;
		Credential.findOneAndUpdate({_id: req.params.id}, result, {new: true}, function(err, result) {
		    resp.json(result);
		});
	});	
}