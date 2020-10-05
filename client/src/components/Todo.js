import React, { useState } from "react";

import { todoComplete, todoDelete } from "../actions/userApp.actions";

import { useDispatch, useSelector } from "react-redux";

import { Grid, IconButton, Typography, Button, Collapse } from "@material-ui/core";

import {
	CheckCircle as CheckCircleIcon,
	CheckCircleOutline as CheckCircleOutlineIcon,
	Create as CreateIcon,
	DeleteOutline as DeleteOutlineIcon
} from "@material-ui/icons";

import TodoModal from "./TodoModal";

const Todo = props => {
	const [expanded, setExpanded] = useState(false);
	const [openMTodo, setOpenMTodo] = useState(false);
	const id = useSelector(state => state.logUser.id);
	const dispatch = useDispatch();

	const handleClickExpand = () => {
		setExpanded(!expanded);
	};

	const handleOpenModifyTodo = () => {
		setOpenMTodo(true);
	};

	const handleCloseModifyTodo = () => {
		setOpenMTodo(false);
	};

	const handleCompleteTodo = () => {
		const lid = props.state.lid;
		const tid = props.todo.tid;
		const todoStatus = props.todo.isCompleted;
		dispatch(todoComplete(id, lid, tid, todoStatus));
	};

	const handleOpenDeleteTodo = () => {
		const lid = props.state.lid;
		const tid = props.todo.tid;
		dispatch(todoDelete(id, lid, tid));
	};

	const todoIsCompleted = () => {
		if (props.todo.isCompleted) {
			return <CheckCircleIcon />;
		} else {
			return <CheckCircleOutlineIcon />;
		}
	};

	return (
		<div className="Todo">
			<Grid container direction="row" alignItems="center">
				<Grid item>
					<IconButton onClick={handleCompleteTodo}>{todoIsCompleted()}</IconButton>
				</Grid>
				<Grid item>
					<Button variant="text" onClick={handleClickExpand}>
						<Typography variant="">{props.todo.title}</Typography>
					</Button>
				</Grid>
				<Grid item>
					<IconButton onClick={handleOpenModifyTodo}>
						<CreateIcon />
					</IconButton>
				</Grid>
				<Grid item>
					<IconButton onClick={handleOpenDeleteTodo}>
						<DeleteOutlineIcon />
					</IconButton>
				</Grid>
			</Grid>

			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Grid
					style={{ padding: 15 }}
					container
					direction="column"
					justify="center"
					alignItems="center"
				>
					<Grid item>
						<Typography variant="subtitle1" color="textSecondary">
							{props.todo.haveLimitDate ? props.todo.limitDate : ""}
						</Typography>
					</Grid>
					<Grid item>
						<Typography align="justify">{props.todo.description}</Typography>
					</Grid>
				</Grid>
			</Collapse>

			<TodoModal /*Update Todo Modal*/
				open={openMTodo}
				dialogTitle={"Update Todo"}
				handleClose={handleCloseModifyTodo}
				withDate={false} //The API Can't Update the Limit Date
				state={props.state}
				todo={props.todo}
			/>
		</div>
	);
};

export default Todo;
