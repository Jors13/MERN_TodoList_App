import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { todoCreate, todoUpdate } from "../actions/userApp.actions";

import { useFormik } from "formik";

import validationSchema from "../validations/validateTodo";

import {
	Dialog,
	Button,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	TextField,
	Grid,
	Checkbox,
	Collapse,
	FormControlLabel
} from "@material-ui/core";

import { getMaterialActualDate } from "../dateFunctions";

import {
	Close as CloseIcon,
	Send as SendIcon,
	DeleteOutline as DeleteOutlineIcon
} from "@material-ui/icons";

const TodoModal = props => {
	const dateNow = getMaterialActualDate();
	const [checked, setChecked] = useState(false);
	const [date, setDate] = useState(dateNow);
	const id = useSelector(state => state.logUser.id);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			title: "",
			description: ""
		},
		validationSchema,
		onSubmit: values => {
			const lid = props.state.lid;

			if (props.withDate) {
				const haveLimitDate = checked;
				const limitDate = date;
				dispatch(
					todoCreate(id, lid, values.title, values.description, haveLimitDate, limitDate)
				);
			} else {
				const tid = props.todo.tid;
				dispatch(todoUpdate(id, lid, tid, values.title, values.description));
			}

			props.handleClose();
		}
	});

	const handleDateChange = e => {
		setDate(e.target.value);
	};

	const handleChange = e => {
		setChecked(e.target.checked);
	};

	const handleClear = () => {
		if (props.withDate) {
			setChecked(false);
			setDate(dateNow);
		}
		formik.values.title = "";
		formik.values.description = "";
	};

	const modifyDate = () => {
		if (props.withDate) {
			return (
				<div>
					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>

					<Grid container justify="center">
						<FormControlLabel
							control={<Checkbox checked={checked} onChange={handleChange} />}
							label="Have Limit Date?"
						/>
					</Grid>

					<Grid container justify="center">
						<Collapse in={checked} timeout="auto" unmountOnExit>
							<TextField
								id="date"
								label="Limit Date"
								type="date"
								defaultValue={date}
								onChange={handleDateChange}
								InputLabelProps={{
									shrink: true
								}}
							/>
						</Collapse>
					</Grid>
				</div>
			);
		}
	};

	return (
		<div>
			<Dialog fullScreen open={props.open}>
				<AppBar>
					<Toolbar>
						<IconButton
							edge="end"
							color="inherit"
							aria-label="close"
							onClick={props.handleClose}
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6">{props.dialogTitle}</Typography>
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
							id="title"
							name="title"
							type="text"
							label={`Title ${formik.errors.title ? formik.errors.title : ""}`}
							variant="outlined"
							value={formik.values.title}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							error={formik.touched.title && formik.errors.title ? true : false}
						/>
					</Grid>

					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>

					<Grid container justify="center">
						<TextField
							multiline
							rows={6}
							id="description"
							name="description"
							type="text"
							label={`Description ${
								formik.errors.description ? formik.errors.description : ""
							}`}
							variant="outlined"
							value={formik.values.description}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							error={
								formik.touched.description && formik.errors.description ? true : false
							}
						/>
					</Grid>

					{modifyDate()}

					<Grid container>
						{/* Space,  Change This */}
						<p></p>
					</Grid>

					<Grid container justify="center" spacing={4}>
						<Grid item>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								endIcon={<SendIcon />}
							>
								SAVE
							</Button>
						</Grid>
						<Grid item>
							<Button
								onClick={handleClear}
								variant="contained"
								color="secondary"
								endIcon={<DeleteOutlineIcon />}
							>
								CLEAR
							</Button>
						</Grid>
					</Grid>
				</form>
			</Dialog>
		</div>
	);
};

export default TodoModal;
