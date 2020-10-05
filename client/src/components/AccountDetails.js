import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { updateUser } from "../actions/userApp.actions.js";

import { useFormik } from "formik";

import validateSchema from "../validations/validateUser";

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	TextField,
	Grid
} from "@material-ui/core";

import { Close as CloseIcon, Send as SendIcon } from "@material-ui/icons";

const AccountDetails = props => {
	const dispatch = useDispatch();
	const id = useSelector(state => state.logUser.id);
	const [open, setOpen] = useState(false);

	const formik = useFormik({
		initialValues: {
			newFullname: "",
			newPassword: "",
			newPasswordConfirm: ""
		},
		validateSchema,
		onSubmit: values => {
			dispatch(updateUser(values, id));
			handleClose();
			props.handleClose();
		}
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog open={props.open} onClose={props.handleClose}>
				<DialogTitle>My Account</DialogTitle>
				<DialogContent dividers>
					<Typography variant="h6">Full Name</Typography>
					<Typography gutterBottom>{props.state.fullname}</Typography>
				</DialogContent>
				<DialogContent dividers>
					<Typography variant="h6">Email</Typography>
					<Typography gutterBottom>{props.state.email}</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickOpen} variant="contained" color="primary">
						Update Data
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog fullScreen open={open} onClose={handleClose}>
				<AppBar>
					<Toolbar>
						<IconButton
							edge="end"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6">Change Data</Typography>
					</Toolbar>
				</AppBar>

				<form onSubmit={formik.handleSubmit} autoComplete="off">
					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>
					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>
					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>
					<Grid container justify="center">
						<TextField
							id="newFullname"
							name="newFullname"
							type="text"
							label={`Full Name ${
								formik.errors.newFullname ? formik.errors.newFullname : ""
							}`}
							variant="outlined"
							value={formik.values.newFullname}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							error={
								formik.touched.newFullname && formik.errors.newFullname ? true : false
							}
						/>
					</Grid>

					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>

					<Grid container justify="center">
						<TextField
							disabled
							id="outlined-basic"
							label="Email Coming Soon..."
							variant="outlined"
							type="email"
						/>
					</Grid>

					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>

					<Grid container justify="center">
						<TextField
							id="newPassword"
							name="newPassword"
							type="password"
							label={`Password ${
								formik.errors.newPassword ? formik.errors.newPassword : ""
							}`}
							variant="outlined"
							value={formik.values.newPassword}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							error={
								formik.touched.newPassword && formik.errors.newPassword ? true : false
							}
						/>
					</Grid>

					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>

					<Grid container justify="center">
						<TextField
							id="newPasswordConfirm"
							name="newPasswordConfirm"
							type="password"
							label={`Password Confirm ${
								formik.errors.newPasswordConfirm ? formik.errors.newPasswordConfirm : ""
							}`}
							variant="outlined"
							value={formik.values.newPasswordConfirm}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							error={
								formik.touched.newPasswordConfirm && formik.errors.newPasswordConfirm
									? true
									: false
							}
						/>
					</Grid>

					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>

					<Grid container justify="center">
						<Button
							variant="contained"
							color="primary"
							type="submit"
							endIcon={<SendIcon />}
						>
							SAVE
						</Button>
					</Grid>
				</form>
			</Dialog>
		</div>
	);
};

export default AccountDetails;
