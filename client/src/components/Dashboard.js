import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { loadUser, updateMessage } from "../actions/userApp.actions";
import { logOut } from "../actions/userLog.actions";

import ListTodo from "./ListTodo";
import AccountDetails from "./AccountDetails";
import AddListButton from "./AddListButton";

import {
	Button,
	ButtonGroup,
	AppBar,
	Toolbar,
	Typography,
	Container,
	Grid,
	CircularProgress
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import {
	ExitToApp as ExitToAppIcon,
	AccountCircle as AccountCircleIcon
} from "@material-ui/icons";

import backgroundTodo from "../static/assets/img/team-leader-teamwork-concept_74855-6671.jpg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Dashboard = () => {
	const [state, setState] = useState({
		id: "",
		fullname: "",
		email: "",
		userlist: []
	});
	const [dataLoaded, setDataLoaded] = useState(false);
	const [open, setOpen] = useState(false);
	const newState = useSelector(state => state.appUser.userData);
	const id = useSelector(state => state.logUser.id);
	const loading = useSelector(state => state.appUser.loading);
	const message = useSelector(state => state.appUser.message);
	const messageType = useSelector(state => state.appUser.messageType);
	const dispatch = useDispatch();

	const responsive = {
		largeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5
		},
		desktop: {
			breakpoint: { max: 4000, min: 1024 },
			items: 3
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};

	useEffect(() => {
		if (id && dataLoaded === false) {
			dispatch(loadUser(id));
			setDataLoaded(true);
		}
		if (dataLoaded === true) {
			setState(newState);
		}
	}, [id, newState, state, loading, message]);

	const handleLogout = e => {
		dispatch(logOut());
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseMessage = () => {
		dispatch(updateMessage(""));
	};

	return (
		<div>
			<Container
				style={{
					position: "relative",
					opacity: loading ? 0.5 : 1,
					pointerEvents: loading ? "none" : "auto"
				}}
			>
				<Grid container>
					<AppBar position="static" className="Navbar-top">
						<Toolbar>
							<Grid item xs={6}>
								<Typography variant="h6">Todo App</Typography>
							</Grid>

							<Grid container item xs={6} justify="flex-end">
								<ButtonGroup variant="contained">
									<Button
										className="logButton"
										endIcon={<AccountCircleIcon />}
										onClick={handleClickOpen}
									>
										Account
									</Button>

									{/* Account UI Modal Dialog and Form*/}
									<AccountDetails state={state} open={open} handleClose={handleClose} />

									<Button
										className="logButton"
										endIcon={<ExitToAppIcon />}
										onClick={handleLogout}
									>
										LogOut
									</Button>
								</ButtonGroup>
							</Grid>
						</Toolbar>
					</AppBar>
				</Grid>

				<Grid container>
					{/* Space,  Change This*/}
					<p></p>
				</Grid>

				{state.userlist.length <= 9 ? <AddListButton /> : null}

				{state.userlist.length === 0 ? (
					<Grid container item justify="center">
						<img alt="Hola Mundo" height={510} width={750} src={backgroundTodo} />
					</Grid>
				) : null}

				<Grid container>
					{/* Space,  Change This*/}
					<p></p>
				</Grid>

				<Carousel
					responsive={responsive}
					showDots={true}
					removeArrowOnDeviceType={["tablet", "mobile"]}
				>
					{/*List Todos UI*/}
					{state.userlist.map((user, i) => {
						return <ListTodo state={user} todos={user.todos} key={i} index={i} />;
					})}
				</Carousel>
			</Container>

			{/*Message and Loader UI */}
			<Grid container justify="center">
				<Grid
					item
					style={{
						position: "absolute",
						margin: "0",
						top: "50%",
						display: loading ? "block" : "none"
					}}
				>
					<CircularProgress />
				</Grid>
			</Grid>

			<Grid container direction="row" justify="flex-end" alignItems="flex-end">
				<Grid
					item
					style={{
						position: "absolute",
						margin: "0",
						display: message !== "" ? "block" : "none"
					}}
				>
					<Alert variant="filled" severity={messageType} onClose={handleCloseMessage}>
						{message}
					</Alert>
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
