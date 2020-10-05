const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../models/User");

module.exports = passport => {
	passport.use(
		new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
			//Match User
			User.findOne({ email: email }) //Change this for a try{} cath(error){}
				.then(user => {
					if (!user) {
						return done(null, false);
					}

					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;
						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false);
						}
					});
				});
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
