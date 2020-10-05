const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		fullname: String,
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		userlist: {
			type: Array
		}
	},
	{
		timestamps: true
	}
);

module.exports = model("User", userSchema);
