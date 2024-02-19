import { RegisterInput } from "./../../api/Users/user";
import { useFormik, FormikHelpers } from "formik";

interface UseLoginFormOptions {
  initialValues?: RegisterInput;
  onSubmit: (values: RegisterInput, formikHelpers: FormikHelpers<RegisterInput>) => Promise<any>;
}

export const useRegisterFormik = (options: UseLoginFormOptions) => {
  // const RegisterSchema = Yup.object().shape({
  //   firstName: Yup.string().required("First name is required"),
  //   lastName: Yup.string().required("Last name is required"),
  //   dateOfBirth: Yup.string().required("Date of birth is required"),
  //   email: Yup.string().email("Please enter a valid email!").required("Email is required"),
  //   password: Yup.string().min(6, "Password should be more than 6 letters").required("Password is required"),
  // });

  return useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    isInitialValid: false,
    validateOnBlur: true,
    validateOnChange: true,
    // validationSchema: RegisterSchema,
    onSubmit: async (values, formikHelpers) => {
      await options.onSubmit(values, formikHelpers);
    },
  });
};

export type LoginFormik = ReturnType<typeof useRegisterFormik>;
