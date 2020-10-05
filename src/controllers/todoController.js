const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");

const { clientSucess, clientError, serverError } = require("../messageTypes");

const todoControl = {};

const User = require("../models/User");

/*const sampleTodos = [  //Sample , how works the API
	{
		todoId: "1", // UIID O ID GENERATE
		todoTitle: "First Todo Task",
		todoDescription: "This is a sample description :)",
		todoIsCompleted: false,
		todoHaveLimitDate: false
	},
	{
		todoId: "2", // UIID O ID GENERATE
		todoTitle: "Second Todo Task",
		todoDescription: "This is a sample description :)",
		todoIsCompleted: false,
		todoHaveLimitDate: true,
		limitDate: "DATE"
	}
];

const defaultList = {
	lid: "1",
	listName: "My First Todo List",
	todos: sampleTodos
};*/

todoControl.createTodo = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(200).json({
			created: false,
			message: "",
			messageType: clientError,
			errors: errors.array()
		});
	}

	// Data to create todo on respective list with lid(LIST ID)
	const { lid, title, description, haveLimitDate, limitDate } = req.body;
	const isCompleted = false;
	const tid = uuidv4();

	try {
		if (haveLimitDate === false) {
			// Verify if todo have a Limit Date to be Completed

			await User.updateOne(
				{ _id: req.params.id, "userlist.lid": lid },
				{
					$push: {
						//Updating List and Pushing new Todo to a userlist.todos array
						"userlist.$.todos": {
							tid,
							title,
							description,
							isCompleted,
							haveLimitDate,
							createdAt: new Date(Date.now()).toISOString()
						}
					}
				}
			);
			res.json({
				created: true,
				message: "Todo Created without Limit Date",
				messageType: clientSucess
			});
		} else if (haveLimitDate === true) {
			await User.updateOne(
				{ _id: req.params.id, "userlist.lid": lid },
				{
					$push: {
						//Updating List and Pushing new Todo to a userlist.todos array with limitDate
						"userlist.$.todos": {
							tid,
							title,
							description,
							isCompleted,
							haveLimitDate,
							limitDate,
							createdAt: new Date(Date.now()).toISOString()
						}
					}
				}
			);
			res.json({
				created: true,
				message: "Todo Created(Have Limit Date)",
				messageType: clientSucess
			});
		}
	} catch (error) {
		res.json({
			created: false,
			message: "Error on Create Todo",
			messageType: serverError,
			devMessage: error
		});
	}
};

todoControl.deleteTodo = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(200).json({
			created: false,
			message: "",
			messageType: clientError,
			errors: errors.array()
		});
	}

	const { lid, tid } = req.body; // listID and todoID

	try {
		await User.updateOne(
			{ _id: req.params.id, "userlist.lid": lid },
			{
				$pull: {
					// Deleting Todo
					"userlist.$.todos": {
						tid
					}
				}
			}
		);
		res.json({ deleted: true, message: "Todo Deleted", messageType: clientSucess });
	} catch (error) {
		res.json({
			deleted: false,
			message: "Error on Delete Todo",
			messageType: serverError,
			devMessage: error
		});
	}
};

todoControl.updateTodo = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(200).json({
			created: false,
			message: "",
			messageType: clientError,
			errors: errors.array()
		});
	}

	const { lid, tid, title, description } = req.body;

	try {
		await User.update(
			{
				_id: req.params.id,
				userlist: {
					$elemMatch: {
						lid,
						"todos.tid": tid
					}
				}
			},
			{
				$set: {
					"userlist.$[outer].todos.$[inner].title": title,
					"userlist.$[outer].todos.$[inner].description": description,
					"userlist.$[outer].todos.$[inner].updatedAt": new Date(Date.now()).toISOString()
				}
			},
			{ arrayFilters: [{ "outer.lid": lid }, { "inner.tid": tid }] }
		);

		res.json({
			updated: true,
			message: "Title and Description Updated",
			messageType: clientSucess
		});
	} catch (error) {
		res.json({
			update: false,
			message: "Error on Update Todo",
			messageType: serverError
		});
	}
};

todoControl.completeTodo = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(200).json({
			created: false,
			message: "",
			messageType: clientError,
			errors: errors.array()
		});
	}

	try {
		const { lid, tid, isCompleted } = req.body;

		if (lid && tid && isCompleted === true) {
			await User.update(
				{
					_id: req.params.id,
					userlist: {
						$elemMatch: {
							lid,
							"todos.tid": tid
						}
					}
				},
				{
					$set: {
						"userlist.$[outer].todos.$[inner].isCompleted": true
					}
				},
				{ arrayFilters: [{ "outer.lid": lid }, { "inner.tid": tid }] }
			);
			res.json({
				updated: true,
				message: "isCompleted Updated to TRUE",
				messageType: clientSucess
			});
		} else if (lid && tid && isCompleted === false) {
			await User.update(
				{
					_id: req.params.id,
					userlist: {
						$elemMatch: {
							lid,
							"todos.tid": tid
						}
					}
				},
				{
					$set: {
						"userlist.$[outer].todos.$[inner].isCompleted": false
					}
				},
				{ arrayFilters: [{ "outer.lid": lid }, { "inner.tid": tid }] }
			);
			res.json({
				updated: true,
				message: "isCompleted Updated to FALSE",
				messageType: clientSucess
			});
		}
	} catch (error) {
		res.json({
			update: false,
			message: "Error on Update Todo",
			messageType: serverError,
			devMessage: error
		});
	}
};

module.exports = todoControl;
