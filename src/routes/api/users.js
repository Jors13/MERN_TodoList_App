const { Router } = require("express");
const router = Router();
const { ensureAuthenticated } = require("../../passport/auth");
const { validateUser } = require("../../controllers/usersValidate");
const { validateTodo } = require("../../controllers/todoValidate");
const { validateList } = require("../../controllers/listValidate");

const {
	createUser,
	getUser,
	deleteUser,
	updateUser,
	loginUser,
	authUser,
	logoutUser,
	errorUser
} = require("../../controllers/usersController");

const {
	createList,
	deleteList,
	updateList
} = require("../../controllers/listController");

const {
	createTodo,
	deleteTodo,
	updateTodo,
	completeTodo
} = require("../../controllers/todoController");

//Create User
router.route("/").post(validateUser("createUser"), createUser);

//Login and Logout
router.route("/login").post(validateUser("loginUser"), loginUser);
router.route("/id").get(ensureAuthenticated, authUser);
router.route("/error").get(errorUser);
router.route("/logout").get(ensureAuthenticated, logoutUser);

//Manage User Data
router
	.route("/:id")
	.get(ensureAuthenticated, getUser)
	.delete(ensureAuthenticated, deleteUser)
	.put(ensureAuthenticated, validateUser("updateUser"), updateUser);

//List
router
	.route("/list/:id")
	.post(ensureAuthenticated, validateList("createList"), createList)
	.put(ensureAuthenticated, validateList("updateList"), updateList)
	.delete(ensureAuthenticated, validateList("deleteList"), deleteList);

//Todo
router
	.route("/todo/:id")
	.post(ensureAuthenticated, validateTodo("createTodo"), createTodo)
	.put(ensureAuthenticated, validateTodo("updateTodo"), updateTodo)
	.patch(ensureAuthenticated, validateTodo("completeTodo"), completeTodo)
	.delete(ensureAuthenticated, validateTodo("deleteTodo"), deleteTodo);

module.exports = router;
