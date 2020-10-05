const { body } = require("express-validator");

exports.validateTodo = method => {
	switch (method) {
		case "createTodo": {
			return [
				body("lid")
					.notEmpty()
					.withMessage("List Id is Empty")
					.exists()
					.withMessage("List ID doesn't exists")
					.isUUID()
					.withMessage("List ID UUID Error"),

				body("title")
					.notEmpty()
					.withMessage("Title is Empty")
					.exists()
					.withMessage("Title doesn't exists")
					.isLength({ max: 25 })
					.withMessage("Title must be 25 chars max"),

				body("description")
					.notEmpty()
					.withMessage("Description is Empty")
					.exists()
					.withMessage("Description doesn't exists")
					.isLength({ max: 10000 })
					.withMessage("Title must be 10.000 chars max"),

				body("haveLimitDate")
					.notEmpty()
					.withMessage("haveLimitDate is Empty")
					.exists()
					.withMessage("Boolean have Limit Date doesn't exists")
					.isBoolean()
					.withMessage("Must be a Boolean variable"),

				body("limitDate")
					.notEmpty()
					.withMessage("Limit Date is Empty")
					.exists()
					.withMessage("Limit Date doesn't exists")
					.isDate()
					.withMessage("Invalid Date")
			];
		}
		case "deleteTodo": {
			return [
				body("lid")
					.notEmpty()
					.withMessage("List ID is Empty")
					.exists()
					.withMessage("List ID doesn't exists")
					.isUUID()
					.withMessage("List ID UUID Error"),

				body("tid")
					.notEmpty()
					.withMessage("Todo ID is Empty")
					.exists()
					.withMessage("Todo ID doesn't exists")
					.isUUID()
					.withMessage("Todo ID UUID Error")
			];
		}
		case "updateTodo": {
			return [
				body("lid")
					.notEmpty()
					.withMessage("List Todo ID is Empty")
					.exists()
					.withMessage("List ID doesn't exists")
					.isUUID()
					.withMessage("List ID UUID Error"),

				body("tid")
					.notEmpty()
					.withMessage("Todo ID is Empty")
					.exists()
					.withMessage("Todo ID doesn't exists")
					.isUUID()
					.withMessage("Todo ID UUID Error"),

				body("title")
					.notEmpty()
					.withMessage("Title is Empty")
					.exists()
					.withMessage("Title doesn't exists")
					.isLength({ max: 25 })
					.withMessage("Title must be 25 chars max"),

				body("description")
					.notEmpty()
					.withMessage("Description is Empty")
					.exists()
					.withMessage("Description doesn't exists")
					.isLength({ max: 10000 })
					.withMessage("Title must be 10.000 chars max")
			];
		}
		case "completeTodo": {
			return [
				body("lid")
					.notEmpty()
					.withMessage("List ID is Empty")
					.exists()
					.withMessage("List ID doesn't exists")
					.isUUID()
					.withMessage("List ID UUID Error"),

				body("tid")
					.notEmpty()
					.withMessage("Todo ID is Empty")
					.exists()
					.withMessage("Todo ID doesn't exists")
					.isUUID()
					.withMessage("Todo ID UUID Error"),

				body("isCompleted")
					.notEmpty()
					.withMessage("isCompleted is Empty")
					.exists()
					.withMessage("isCompleted variable doesn't exists")
					.isBoolean()
					.withMessage("Must be a Boolean variable")
			];
		}
	}
};
