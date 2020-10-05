require("dotenv").config(); //KEYS

const morgan = require("morgan");
const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const session = require("express-session");
// const cors = require("cors");

//Settings
const PORT = process.env.PORT || 4000;
require("./passport/local-auth")(passport); // Passport Config

//Middlewares
// If i get data from another servers or client install npm i cors and add like middleware
app.use(morgan("dev"));
app.use(express.json());
// app.use(cors());

//Express Session
app.use(
	session({
		secret: process.env.SECRET,
		cookie: { maxAge: 900000 },
		resave: true,
		saveUninitialized: true
	})
);
//Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/users", require("./routes/api/users"));

//Production Statis serve(Heroku)
if (process.env.NODE_ENV === "production") {
	// Static Folder
	app.use(express.static("client/build"));
	app.get("/", (req, res) => {
		res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
	});
}

//Start Server
async function main() {
	await app.listen(PORT);
	console.log(`Server on PORT ${PORT}`);
}

//Connect to MongoDB
require("./database");

//Auth With Passport
require("./passport/local-auth");

main();
