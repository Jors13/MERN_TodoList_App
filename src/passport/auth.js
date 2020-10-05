module.exports = {
	ensureAuthenticated: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect("/api/users/error");
		}
	}
};
