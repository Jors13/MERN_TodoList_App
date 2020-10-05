import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { createList, deleteList, updateList } from "../actions/userApp.actions";

import { useFormik } from "formik";

import validationSchema from "../validations/validateList";

import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button
} from "@material-ui/core";

import {
	DeleteOutline as DeleteOutlineIcon,
	GetApp as GetAppIcon
} from "@material-ui/icons";

const AddListModal = props => {
	const dispatch = useDispatch();
	const id = useSelector(state => state.logUser.id);

	const formik = useFormik({
		initialValues: {
			listName: ""
		},
		validationSchema
	});

	const handleCreateList = e => {
		e.preventDefault();
		dispatch(createList(id, formik.values.listName));
		props.handleClose();
	};

	const handleUpdateList = e => {
		e.preventDefault();
		dispatch(updateList(id, props.lid, formik.values.listName));
		props.handleClose();
	};

	const handleDeleteList = e => {
		e.preventDefault();
		dispatch(deleteList(id, props.lid));
		props.handleClose();
	};

	const typeComponent = () => {
		if (props.typeComp === "UPDATE") {
			return (
				<div>
					<Button
						variant="contained"
						color="secondary"
						endIcon={<DeleteOutlineIcon />}
						onClick={handleDeleteList}
					>
						DELETE
					</Button>
					<Button
						variant="contained"
						color="primary"
						endIcon={<GetAppIcon />}
						onClick={handleUpdateList}
					>
						UPDATE
					</Button>
				</div>
			);
		} else if (props.typeComp === "CREATE") {
			return (
				<div>
					<Button variant="contained" color="primary" onClick={handleCreateList}>
						SAVE
					</Button>
				</div>
			);
		}
	};

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>{props.dialogTitle}</DialogTitle>
			<DialogContent>
				<TextField
					id="listName"
					name="listName"
					type="email"
					label={`List Name ${formik.errors.listName ? formik.errors.listName : ""}`}
					variant="outlined"
					value={formik.values.listName}
					onChange={formik.handleChange}
					error={formik.errors.listName ? true : false}
				/>
			</DialogContent>
			<DialogActions>{typeComponent()}</DialogActions>
		</Dialog>
	);
};

export default AddListModal;
