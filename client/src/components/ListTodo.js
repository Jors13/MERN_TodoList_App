import React, { useState } from "react";

import { Card, CardHeader, IconButton, Grid } from "@material-ui/core";

import {
	Settings as SettingsIcon,
	AddCircleOutline as AddCircleOutlineIcon
} from "@material-ui/icons";

import AddListModal from "./AddListModal";
import TodoModal from "./TodoModal";
import Todo from "./Todo";

const ListTodos = props => {
	const [openUList, setOpenUList] = useState(false);
	const [openNTodo, setOpenNTodo] = useState(false);

	const handleOpenUpdateList = () => {
		setOpenUList(true);
	};

	const handleCloseUpdateList = () => {
		setOpenUList(false);
	};

	const handleOpenNewTodo = () => {
		setOpenNTodo(true);
	};

	const handleCloseNewTodo = () => {
		setOpenNTodo(false);
	};

	return (
		<div>
			<Card variant="outlined">
				<CardHeader
					action={
						<IconButton onClick={handleOpenUpdateList}>
							<SettingsIcon />
						</IconButton>
					}
				></CardHeader>
				<CardHeader
					action={
						<IconButton onClick={handleOpenNewTodo}>
							<AddCircleOutlineIcon />
						</IconButton>
					}
					title={props.state.listName}
				></CardHeader>

				{props.todos.map((todo, i) => {
					return <Todo state={props.state} todo={todo} key={i} index={i} />;
				})}

				<Grid container>
					{/* Space,  Change This*/}
					<p></p>
				</Grid>

				<TodoModal /*Add New Todo Modal*/
					open={openNTodo}
					dialogTitle={"Create New Todo"}
					handleClose={handleCloseNewTodo}
					withDate={true}
					state={props.state}
				/>

				<AddListModal /*Update List Modal*/
					open={openUList}
					dialogTitle={"Update List"}
					handleClose={handleCloseUpdateList}
					typeComp={"UPDATE"}
					lid={props.state.lid}
				/>
			</Card>
		</div>
	);
};

export default ListTodos;
