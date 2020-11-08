import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { logIn, updateMessage } from "../actions/userLog.actions";

import { Link, Redirect } from "react-router-dom";

import { useFormik } from "formik";

import validationSchema from "../validations/validateLogIn";

import {
	Typography,
	Grid,
	Container,
	Button,
	InputAdornment,
	TextField,
	CircularProgress
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import {
	Send as SendIcon,
	AccountBox as AccountBoxIcon,
	VpnKey as VpnKeyIcon
} from "@material-ui/icons";

const Login = () => {
	const areLog = useSelector(state => state.logUser.loggedIn);
	const loading = useSelector(state => state.logUser.loading);
	const message = useSelector(state => state.logUser.message);
	const messageType = useSelector(state => state.logUser.messageType);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			logEmail: "",
			logPassword: ""
		},
		validationSchema,
		onSubmit: values => {
			dispatch(logIn(values));
		}
	});

	const handleCloseMessage = () => {
		dispatch(updateMessage(""));
	};

	useEffect(() => {}, [message, areLog, loading]);

	if (areLog === true) {
		return <Redirect to="dashboard" />;
	} else {
		return (
			<div>
				<form onSubmit={formik.handleSubmit} autoComplete="on">
					<Container
						disableGutters={true}
						style={{
							position: "relative",
							opacity: loading ? 0.5 : 1,
							pointerEvents: loading ? "none" : "auto"
						}}
					>
						<Grid container>
							{/* Space,  Change This*/}
							<p></p>
						</Grid>

						<Grid container justify="center">
							<Typography variant="h4">Todo App Login</Typography>
						</Grid>

						<Grid container>
							{/* Space,  Change This */}
							<p></p>
						</Grid>

						<Grid container>
							{/* Space,  Change This */}
							<p></p>
						</Grid>

						<Grid container direction="column" justify="center" alignItems="center">
							<Grid container item xs={8} sm={5} md={4} lg={3} xl={3}>
								<TextField
									id="logEmail"
									name="logEmail"
									type="email"
									label={`Email ${formik.errors.logEmail ? formik.errors.logEmail : ""}`}
									variant="outlined"
									autoComplete="email"
									fullWidth
									value={formik.values.logEmail}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									error={formik.touched.logEmail && formik.errors.logEmail ? true : false}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<AccountBoxIcon />
											</InputAdornment>
										)
									}}
								/>

								<Grid container>
									{/* Space,  Change This */}
									<p></p>
								</Grid>

								<TextField
									id="logPassword"
									name="logPassword"
									type="password"
									label={`Password ${
										formik.errors.logPassword ? formik.errors.logPassword : ""
									}`}
									variant="outlined"
									autoComplete="current-password"
									fullWidth
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.logPassword}
									error={
										formik.touched.logPassword && formik.errors.logPassword ? true : false
									}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<VpnKeyIcon />
											</InputAdornment>
										)
									}}
								/>
							</Grid>

							<Grid container>
								{/* Space,  Change This*/}
								<p></p>
							</Grid>

							<Grid item>
								<Button
									variant="contained"
									color="primary"
									type="submit"
									endIcon={<SendIcon />}
								>
									Send
								</Button>
							</Grid>

							<Grid container>
								{/* Space,  Change This*/}
								<p></p>
							</Grid>

							<Grid container item justify="center" alignItems="center">
								<Link to="/signIn" style={{ textDecoration: "none" }}>
									<Button
										variant="outlined"
										color="secondary"
										style={{ margin: "0 10px 10px 10px" }}
									>
										Sign In
									</Button>
								</Link>
								<Link to="#" style={{ textDecoration: "none" }}>
									<Button disabled style={{ margin: "0 10px 10px 10px" }}>
										Recover password
									</Button>
								</Link>
								{/*<Link to="/signIn">Recover Password</Link>*/}
							</Grid>
						</Grid>
					</Container>
				</form>

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
							bottom: "40%",
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
	}
};

export default Login;
