const { param, body, check } = require("express-validator");

exports.validateUser = method => {
	switch (method) {
		case "createUser": {
			return [
				body("fullname")
					.notEmpty()
					.withMessage("Confirm Email(email2) is Empty")
					.exists()
					.withMessage("Fullname doesn't exists")
					.isLength({ min: 10 })
					.withMessage("Fullname must be 10 chars min ")
					.isLength({ max: 50 })
					.withMessage("Fullname must be 50 chars max"),

				body("email1")
					.notEmpty()
					.withMessage("Confirm Email(email2) is Empty")
					.exists()
					.withMessage("Email doesn't exists")
					.isEmail()
					.withMessage("Email1 is not a valid email")
					.normalizeEmail(),

				body("email2")
					.notEmpty()
					.withMessage("Confirm Email(email2) is Empty")
					.exists()
					.withMessage("Confirm Email(email2) doesn't exists")
					.isEmail()
					.withMessage("Confirm Email(email2) is not a valid email")
					.normalizeEmail()
					.custom((value, { req }) => {
						if (value !== req.body.email1) {
							throw new Error("Email confirmation is Incorrect");
						}
						return true;
					}),

				body("password1")
					.notEmpty()
					.withMessage("Confirm Email(email2) is Empty")
					.exists()
					.withMessage("Password doesn't exists")
					.isLength({ min: 8 })
					.withMessage("Password must be 8 chars min "),

				body("password2")
					.notEmpty()
					.withMessage("Confirm Email(email2) is Empty")
					.exists()
					.withMessage("Password Confirm(password2) doesn't exists")
					.isLength({ min: 8 })
					.withMessage("Password 2 must be 8 chars min ")
					.custom((value, { req }) => {
						if (value !== req.body.password1) {
							throw new Error("Password confirmation is Incorrect");
						}
						return true;
					})
			];
		}
		case "updateUser": {
			return [
				body("fullname")
					.isLength({ min: 10 })
					.withMessage("Fullname must be 10 chars min ")
					.isLength({ max: 100 })
					.withMessage("Fullname must be 100 chars max"),

				body("password1")
					.isLength({ min: 8 })
					.withMessage("Password must be 8 chars min "),

				body("password2")
					.isLength({ min: 8 })
					.withMessage("Password 2 must be 8 chars min ")
					.custom((value, { req }) => {
						if (value !== req.body.password1) {
							throw new Error("Password confirmation is Incorrect");
						}
						return true;
					})
			];
		}
		case "loginUser": {
			return [
				body("email")
					.notEmpty()
					.withMessage("Email is Empty")
					.exists()
					.withMessage("Email doesn't exists")
					.isEmail()
					.withMessage("Email is not a valid email")
					.normalizeEmail(),
				body("password")
					.notEmpty()
					.withMessage("Password is Empty")
					.exists()
					.withMessage("Password doesn't exists")
					.isLength({ min: 8 })
					.withMessage("Password must be 8 chars min ")
			];
		}
	}
};
