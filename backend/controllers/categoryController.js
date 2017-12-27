var Category = require('../models/category');
require('mongoose-pagination');

exports.getList = function(req, resp){
	// Lấy tham số và parse ra number.
	console.log('Page: ' + req.query.page);
	console.log('Limit: ' + req.query.limit);
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);

	Category.find({'status': 1})
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
	Category.findOne({ _id: req.params.id, 'status': 1 },function(err, result){
		resp.send(result);
	});
}

exports.add = function(req, resp){		
	var category = new Category(req.body);	
	category.save(function(err){				
		resp.send(category);
	});
}

exports.update = function(req, resp){
	Category.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, result) {
	    resp.json(result);
	});
}

exports.delete = function(req, resp){
	// Student.remove({
	//     _id: req.params.id
 	//    }, function(err, result) {
	//     resp.json({ message: 'Successfully deleted' });
	// });
	Category.findById(req.params.id,function(err, result){				
		result.status = 0;
		Category.findOneAndUpdate({_id: req.params.id}, result, {new: true}, function(err, result) {
		    resp.json(result);
		});
	});	
}