const passport = require("passport");

const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");

const { clientSucess, clientError, serverError } = require("../messageTypes");

const usersControl = {};

const User = require("../models/User");

usersControl.createUser = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(200).json({
			created: false,
			message: "Error on Create User",
			messageType: clientError,
			errors: errors.array()
		});
	}

	const { fullname, email1, email2, password1, password2 } = req.body;

	try {
		const password = password1;
		const email = email1;

		const newUser = new User({
			fullname,
			email,
			password
		});

		//Hash Password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				//Set Password to Hash
				newUser.password = hash;

				//Save User
				newUser //Change this for a try{} cath(error){}
					.save()
					.then(user => {
						res.json({
							created: true,
							message: "User Created",
							messageType: clientSucess
						});
					})
					.catch(error => {
						res.json({
							created: false,
							message: "Error on Hash Password",
							messageType: serverError
						});
					});
			});
		});
	} catch (error) {
		res.json({
			created: false,
			message: "Server Error on Create User",
			messageType: serverError,
			devMessage: error
		});
	}
};

usersControl.getUser = async (req, res) => {
	try {
		const { _id, fullname, email, userlist } = await User.findById(req.params.id);
		res.json({
			id: _id,
			fullname,
			email,
			userlist,
			message: "User GET Success",
			messageType: clientSucess
		});
	} catch (error) {
		res.json({
			message: "Error on GET User Data",
			messageType: serverError,
			devMessage: error
		});
	}
};

usersControl.updateUser = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(200).json({
			updated: false,
			message: "",
			messageType: clientError,
			errors: errors.array()
		});
	}

	const { fullname, password1, password2 } = req.body;
	try {
		if (fullname && password1 && password2) {
			const password = password1;
			let hashPassword = password;

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(hashPassword, salt, (err, hash) => {
					//Set Password to Hash
					hashPassword = hash;

					//Save User
					User.findOneAndUpdate(
						{ _id: req.params.id },
						{
							fullname,
							password: hashPassword
						}
					)
						.then(user => {
							res.json({
								updated: true,
								message: "Password and Name Updated",
								messageType: clientSucess
							});
						})
						.catch(error => {
							res.json({
								updated: false,
								message: "Error on Update Password and Name",
								messageType: serverError,
								devMessage: error
							});
						});
				});
			});
		} else if (password1 && password2) {
			const password = password1;
			let hashPassword = password;

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(hashPassword, salt, (err, hash) => {
					//Set Password to Hash
					hashPassword = hash;

					//Save User
					User.findOneAndUpdate(
						{ _id: req.params.id },
						{
							password: hashPassword
						}
					)
						.then(user => {
							res.json({
								updated: true,
								message: "Password Updated",
								messageType: clientSucess
							});
						})
						.catch(error => {
							res.json({
								updated: false,
								message: "Error on Update Password",
								messageType: serverError
							});
						});
				});
			});
		} else if (fullname) {
			// Update Name
			await User.findOneAndUpdate(
				{ _id: req.params.id },
				{
					fullname
				}
			);

			res.json({ updated: true, message: "Name Updated", messageType: clientSucess });
		}
	} catch (error) {
		res.json({
			updated: false,
			message: "Error on Update User",
			messageType: serverError,
			devMessage: error
		});
	}
};

usersControl.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ deleted: true, message: "User Deleted", messageType: clientSucess });
	} catch (error) {
		console.log(error);
		res.json({
			deleted: false,
			message: "Error on Delete User",
			messageType: serverError,
			devMessage: error
		});
	}
};

usersControl.loginUser = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(200).json({
			loggedIn: false,
			message: "Wrong Email or Password",
			messageType: clientError,
			errors: errors.array()
		});
	}

	passport.authenticate("local", {
		successRedirect: "/api/users/id",
		failureRedirect: "/api/users/error"
	})(req, res, next);
};

usersControl.authUser = async (req, res) => {
	const ObjectId = req.user._id;
	res.json({
		loggedIn: true,
		ObjectId,
		message: "UserLogin Success",
		messageType: clientSucess
	});
};

usersControl.logoutUser = async (req, res) => {
	req.logout();
	res.json({ loggedIn: false, message: "User Logout Sucess", messageType: clientSucess });
};

usersControl.errorUser = async (req, res) => {
	res.json({ loggedIn: false, message: "Wrong data on Login", messageType: clientError });
};

module.exports = usersControl;
