import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { regUser, updateMessage } from "../actions/userReg.actions";

import { Link } from "react-router-dom";

import { useFormik } from "formik";

import validationSchema from "../validations/validateSignIn";

import {
	Typography,
	Grid,
	Container,
	Button,
	TextField,
	CircularProgress,
	Card,
	CardMedia
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import { Send as SendIcon } from "@material-ui/icons";

import background from "../static/assets/img/female-student-listening-webinar-online_74855-6461.jpg";

const SignIn = () => {
	const loading = useSelector(state => state.regUser.loading);
	const message = useSelector(state => state.regUser.message);
	const messageType = useSelector(state => state.regUser.messageType);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			regFullname: "",
			regEmail: "",
			regEmailConfirm: "",
			regPassword: "",
			regPasswordConfirm: ""
		},
		validationSchema,
		onSubmit: values => {
			dispatch(regUser(values));
		}
	});

	const handleCloseMessage = () => {
		dispatch(updateMessage(""));
	};

	useEffect(() => {}, [loading, message]);

	return (
		<div>
			<form onSubmit={formik.handleSubmit} autoComplete="off">
				<Container
					disableGutters={true}
					style={{
						position: "relative",
						opacity: loading ? 0.5 : 1,
						pointerEvents: loading ? "none" : "auto"
					}}
				>
					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>

					<Grid container justify="center">
						<Typography variant="h4">Todo App Register</Typography>
					</Grid>

					<Grid container direction="row" justify="center" alignItems="center">
						<Grid container item xs={12} sm={12} md={6} lg={6} xl={6} justify="center">
							<Card style={{ boxShadow: "none" }}>
								<CardMedia
									component="img"
									alt="Home background"
									image={background}
									title="Home background"
								/>
							</Card>
						</Grid>

						<Grid item xs={12} sm={12} md={2} lg={1} xl={1}>
							{/* Space,  Change This */}
							<p></p>
						</Grid>

						<Grid container item xs={8} sm={5} md={3} lg={3} xl={3}>
							<TextField
								id="regFullname"
								name="regFullname"
								type="text"
								label={`Fullname ${
									formik.errors.regFullname ? formik.errors.regFullname : ""
								}`}
								variant="outlined"
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.regFullname}
								error={
									formik.touched.regFullname && formik.errors.regFullname ? true : false
								}
							/>

							<Grid container>
								{/* Space,  Change This */}
								<p></p>
							</Grid>

							<TextField
								id="regEmail"
								name="regEmail"
								type="email"
								label={`Email ${formik.errors.regEmail ? formik.errors.regEmail : ""}`}
								variant="outlined"
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.regEmail}
								error={formik.touched.regEmail && formik.errors.regEmail ? true : false}
							/>

							<Grid container>
								{/* Space,  Change This */}
								<p></p>
							</Grid>

							<TextField
								id="regEmailConfirm"
								name="regEmailConfirm"
								type="email"
								label={`Confirm Email ${
									formik.errors.regEmailConfirm ? formik.errors.regEmailConfirm : ""
								}`}
								variant="outlined"
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.regEmailConfirm}
								error={
									formik.touched.regEmailConfirm && formik.errors.regEmailConfirm
										? true
										: false
								}
							/>

							<Grid container>
								{/* Space,  Change This */}
								<p></p>
							</Grid>

							<TextField
								id="regPassword"
								name="regPassword"
								type="password"
								label={`Password ${
									formik.errors.regPassword ? formik.errors.regPassword : ""
								}`}
								variant="outlined"
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.regPassword}
								error={
									formik.touched.regPassword && formik.errors.regPassword ? true : false
								}
							/>

							<Grid container>
								{/* Space,  Change This */}
								<p></p>
							</Grid>

							<TextField
								id="regPasswordConfirm"
								name="regPasswordConfirm"
								type="password"
								label={`Confirm Password ${
									formik.errors.regPasswordConfirm ? formik.errors.regPasswordConfirm : ""
								}`}
								variant="outlined"
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.regPasswordConfirm}
								error={
									formik.touched.regPasswordConfirm && formik.errors.regPasswordConfirm
										? true
										: false
								}
							/>
						</Grid>

						<Grid container>
							{/* Space,  Change This */}
							<p></p>
						</Grid>

						<Button
							variant="contained"
							type="submit"
							color="primary"
							endIcon={<SendIcon />}
						>
							Register
						</Button>

						<Grid container>
							{/* Space,  Change This */}
							<p></p>
						</Grid>

						<Link to="/login" style={{ textDecoration: "none" }}>
							<Button
								variant="outlined"
								color="secondary"
								style={{ margin: "0 10px 10px 10px" }}
							>
								Login
							</Button>
						</Link>
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

export default SignIn;
