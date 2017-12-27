var studentController = require('../controllers/studentController');
var categoryController = require('../controllers/categoryController');
var accountController = require('../controllers/accountController');
var authenticationController = require('../controllers/authenticationController');

module.exports = function(app){
	// students api.
	app.route('/_api/v1/students')
		.get(studentController.getList)
		.post(studentController.add);	

	app.route('/_api/v1/students/:id')
		.get(studentController.getDetail)
		.put(studentController.update)
		.delete(studentController.delete);	

	// category api.
	app.route('/_api/v1/categories')
		.get(categoryController.getList)
		.post(categoryController.add);	

	app.route('/_api/v1/categories/:id')
		.get(categoryController.getDetail)
		.put(categoryController.update)
		.delete(categoryController.delete);	

	// account api.
	app.route('/_api/v1/accounts')
		.get(accountController.getList)
		.post(accountController.add);	

	app.route('/_api/v1/accounts/:id')
		.get(accountController.getDetail)
		.put(accountController.update)
		.delete(accountController.delete);

	// authentication api.
	app.route('/_api/v1/authentication')
		.post(authenticationController.authentication);
	app.route('/_api/v1/authentication/:id')		
		.delete(authenticationController.delete);

	// image api.	
	app.post('/_api/v1/images', function(req, res) {		
		console.log(req.files);
		if (!req.files)
			return res.status(400).send('No files were uploaded.');

		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		let sampleFile = req.files.myFile;	

		// Use the mv() method to place the file somewhere on your server
		sampleFile.mv('./public/images/' + sampleFile.name, function(err) {
			if (err)
			  return res.status(500).send(err);

			res.send('http://localhost:3000/images/' + sampleFile.name);
		});
	});	
}