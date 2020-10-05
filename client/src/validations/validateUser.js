import * as Yup from "yup";

const validationSchema = Yup.object({
	newFullname: Yup.string()
		.max(50, "Must be 50 characters Max")
		.min(10, "Must be 10 characters Min")
		.required("Required"),
	newPassword: Yup.string()
		.min(8, "Too Short")
		.required("Required"),
	newPasswordConfirm: Yup.string()
		.min(8, "Too Short")
		.required("Required")
		.oneOf([Yup.ref("newPassword"), null], "Dont match")
});

export default validationSchema;
