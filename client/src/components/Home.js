import React from "react";

import {
	Button,
	ButtonGroup,
	AppBar,
	Toolbar,
	Typography,
	Container,
	Grid,
	Card,
	CardMedia
} from "@material-ui/core";

import { Link } from "react-router-dom";

import background from "../static/assets/img/people-using-online-appointment-booking-app_74855-5556.jpg";

const Home = props => {
	return (
		<Container disableGutters={true}>
			<Grid container direction="column" justify="center" alignItems="center" spacing={5}>
				<AppBar position="fixed" className="Navbar-top" style={{ top: 0 }}>
					<Toolbar>
						<Grid container item xs={2} justify="flex-start">
							<Typography variant="h6">TodoList</Typography>
						</Grid>

						<Grid container item xs={6} justify="flex-start"></Grid>

						<Grid container item xs={4} justify="flex-end">
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

				<Grid item xs={12} style={{ marginTop: "20vh" }}>
					<Card style={{ boxShadow: "none" }}>
						<CardMedia
							component="img"
							alt="Home background"
							image={background}
							title="Home background"
						/>
					</Card>
				</Grid>

				<AppBar
					position="fixed"
					className="Navbar-bot"
					style={{ bottom: 0, top: "auto" }}
				>
					<Grid container item justify="center">
						<Typography className="credits" variant="subtitle1" align="center">
							<a href="https://www.freepik.com/free-photos-vectors/school">
								All Vectors was created by pch.vector, take a look on www.freepik.com
							</a>
						</Typography>
					</Grid>
					<Grid container item justify="center">
						<Typography className="info" variant="subtitle2" align="center">
							The Developer of entire this application it's Jorge Ocaris, Contact and
							Work(Github) or just say Hi on Facebook, Twitter and Instagram.
						</Typography>
					</Grid>
				</AppBar>
			</Grid>
		</Container>
	);
};

export default Home;
