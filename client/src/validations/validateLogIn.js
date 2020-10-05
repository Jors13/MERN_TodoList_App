import * as Yup from "yup";

const validationSchema = Yup.object({
	logEmail: Yup.string()
		.email("Invalid")
		.required("Required"),
	logPassword: Yup.string()
		.min(8, "Too Short")
		.required("Required")
});

export default validationSchema;
