import * as Yup from "yup";

const validationSchema = Yup.object({
	title: Yup.string()
		.max(25, "Must be 25 characters Max")
		.required("Required"),
	description: Yup.string()

		.max(10000, "Must be 10000 characters Max")
		.required("Required")
});

export default validationSchema;
