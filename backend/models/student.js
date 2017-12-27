var mongoose = require('mongoose');

module.exports = mongoose.model('students', {
	rollNumber: {
		type: String,
		required: 'Please enter roll number.'
	},
	firstName: String,
	lastName: String,
	gender: Number,
	birthday: Date,
	avatarUrl: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	status: {
		type: Number,
		default: 1
	}
});