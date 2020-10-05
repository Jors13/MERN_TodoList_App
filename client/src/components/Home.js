import React from "react";

import {
	Button,
	ButtonGroup,
	AppBar,
	Toolbar,
	Typography,
	Container,
	Grid,
	CardMedia
} from "@material-ui/core";

import { Link } from "react-router-dom";

import background from "../static/assets/img/people-using-online-appointment-booking-app_74855-5556.jpg";

const Home = props => {
	return (
		<Container disableGutters={true}>
			<Grid container direction="column" justify="center" alignItems="center">
				<AppBar position="static" className="Navbar-top">
					<Toolbar>
						<Grid item xs={6}>
							<Typography variant="h6">TodoList App</Typography>
						</Grid>

						<Grid container item xs={6} justify="flex-end">
							<ButtonGroup variant="contained">
								<Button className="logButton">
									<Link to="/login">LogIn</Link>
								</Button>
								<Button className="logButton">
									<Link to="/signIn">Register</Link>
								</Button>
							</ButtonGroup>
						</Grid>
					</Toolbar>
				</AppBar>

				<Grid item style={{ marginTop: "5%" }}>
					<CardMedia
						component="img"
						alt="Home background"
						height="400"
						image={background}
						title="Home background"
					/>
				</Grid>

				<AppBar
					position="static"
					className="Navbar-bot"
					style={{ marginTop: "5%", paddingTop: "15px", paddingBottom: "15px" }}
				>
					<Grid container item justify="center">
						<Typography variant="subtitle1">
							<a
								href="https://www.freepik.com/free-photos-vectors/school"
								style={{ textDecoration: "none" }}
							>
								All Vectors was created by pch.vector, take a look on www.freepik.com
							</a>
						</Typography>
					</Grid>
					<Grid container item justify="center">
						<Typography variant="subtitle2">
							The Developer of entire this application it's Jorge A. Ocaris A. Contact and
							Work(Github) or Talk with Me on Facebook,Twitter
						</Typography>
					</Grid>
				</AppBar>
			</Grid>
		</Container>
	);
};

export default Home;
