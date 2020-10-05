import * as Yup from "yup";

const validationSchema = Yup.object({
	listName: Yup.string()
		.max(25, "Only 25 characters on ListName")
		.required("Required")
});

export default validationSchema;
