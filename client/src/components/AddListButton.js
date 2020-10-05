import React, { useState } from "react";

import AddListModal from "./AddListModal";

import { Fab, Grid } from "@material-ui/core";

import { Add as AddIcon } from "@material-ui/icons";

const AddListButton = props => {
	const [openList, setOpenList] = useState(false);

	const handleOpenAddList = () => {
		setOpenList(true);
	};

	const handleCloseAddList = () => {
		setOpenList(false);
	};

	return (
		<div>
			<Grid container direction="row" justify="center" alignItems="center">
				<Grid item>
					<Fab
						onClick={handleOpenAddList}
						color="primary"
						size="medium"
						variant="extended"
					>
						<AddIcon />
						Add New List
					</Fab>
				</Grid>
			</Grid>

			{/*<Button onClick={handleOpenAddList}>Add List</Button>;*/}
			<AddListModal /*Add List Modal*/
				open={openList}
				dialogTitle={"Create New List"}
				handleClose={handleCloseAddList}
				typeComp={"CREATE"}
			/>
		</div>
	);
};

export default AddListButton;
