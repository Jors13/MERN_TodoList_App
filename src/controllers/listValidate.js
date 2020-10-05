const { body } = require("express-validator");

exports.validateList = method => {
	switch (method) {
		case "createList": {
			return [
				body("listName")
					.notEmpty()
					.withMessage("List Name is Empty")
					.exists()
					.withMessage("List Name doesn't exists")
					.isLength({ max: 25 })
					.withMessage("List Name must be 25 chars max")
			];
		}
		case "deleteList": {
			return [
				body("lid")
					.notEmpty()
					.exists()
					.withMessage("List Id doesn't exists")
					.isUUID()
					.withMessage("List ID UUID Error")
			];
		}
		case "updateList": {
			return [
				body("lid")
					.notEmpty()
					.exists()
					.withMessage("List Id doesn't exists")
					.isUUID()
					.withMessage("List ID UUID Error"),

				body("listName")
					.notEmpty()
					.exists()
					.withMessage("List Name doesn't exists")
					.isLength({ max: 25 })
					.withMessage("List Name must be 25 chars max")
			];
		}
	}
};
