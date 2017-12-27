var Student = require('../models/student');
var authenticationController = require('../controllers/authenticationController');
require('mongoose-pagination');

exports.getList = function(req, resp){
	if (authenticationController.checkToken(req.headers.authorization)){
		console.log('Okie');
	}else{
		console.log('Not  okie');
	}

	// Lấy tham số và parse ra number.	
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);

	Student.find({'status': 1})
	.paginate(page, limit, function(err, result, total) {    	
    	var responseData = {
    		'listStudent': result,
    		'totalPage': Math.ceil(total/limit)
    	};
    	resp.send(responseData);
  	});
}

exports.getDetail = function(req, resp){	
	Student.findOne({ _id: req.params.id, 'status': 1 },function(err, result){
		resp.send(result);
	});
}

exports.add = function(req, resp){		
	var student = new Student(req.body);	
	student.save(function(err){				
		resp.send(student);
	});
}

exports.update = function(req, resp){
	Student.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, result) {
	    resp.json(result);
	});
}

exports.delete = function(req, resp){
	// Student.remove({
	//     _id: req.params.id
 	//    }, function(err, result) {
	//     resp.json({ message: 'Successfully deleted' });
	// });
	Student.findById(req.params.id,function(err, result){				
		result.status = 0;
		Student.findOneAndUpdate({_id: req.params.id}, result, {new: true}, function(err, result) {
		    resp.json(result);
		});
	});	
}