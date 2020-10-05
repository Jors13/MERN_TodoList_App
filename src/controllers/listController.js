const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");

const { clientSucess, clientError, serverError } = require("../messageTypes");

const listTodoControl = {};

const User = require("../models/User");

listTodoControl.createList = async (req, res) => {
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
		const { listName } = req.body;
		const lid = uuidv4();
		const todos = [];

		await User.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$push: { userlist: { lid, listName, todos } }
			}
		);
		res.json({ created: true, message: "List Created", messageType: clientSucess });
	} catch (error) {
		res.json({
			created: false,
			message: "Error on Create List",
			messageType: serverError,
			devMessage: error
		});
	}
};

listTodoControl.deleteList = async (req, res) => {
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
		const { lid } = req.body;

		await User.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$pull: { userlist: { lid: lid } }
			}
		);
		res.json({ deleted: true, message: "List Deleted", messageType: clientSucess });
	} catch (error) {
		res.json({
			deleted: false,
			message: "Error on Delete List",
			messageType: serverError,
			devMessage: error
		});
	}
};

listTodoControl.updateList = async (req, res) => {
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
		const { listName, lid } = req.body;

		await User.updateOne(
			{ _id: req.params.id, "userlist.lid": req.body.lid },
			{
				$set: { "userlist.$.listName": listName }
			}
		);
		res.json({
			updated: true,
			message: "List Namer Updated",
			messageType: clientSucess
		});
	} catch (error) {
		res.json({
			updated: false,
			message: "Error on Update Data",
			messageType: serverError,
			devMessage: error
		});
	}
};

module.exports = listTodoControl;
