import * as Yup from "yup";

const validationSchema = Yup.object({
	regFullname: Yup.string()
		.max(50, "Must be 50 characters Max")
		.min(10, "Must be 10 characters Min")
		.required("Required"),
	regEmail: Yup.string()
		.email("Invalid")
		.required("Required"),
	regEmailConfirm: Yup.string()
		.email("Invalid")
		.required("Required")
		.oneOf([Yup.ref("regEmail"), null], "Dont match"),
	regPassword: Yup.string()
		.min(8, "Too Short")
		.required("Required"),
	regPasswordConfirm: Yup.string()
		.min(8, "Too Short")
		.required("Required")
		.oneOf([Yup.ref("regPassword"), null], "Dont match")
});

export default validationSchema;
