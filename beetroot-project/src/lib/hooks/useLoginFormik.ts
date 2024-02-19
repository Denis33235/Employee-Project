import { LoginInput } from "./../../api/Users/user";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface UseLoginFormOptions {
  initialValues?: LoginInput;
  onSubmit: (values: LoginInput, formikHelpers: FormikHelpers<LoginInput>) => Promise<any>;
}

export const useLoginFormik = (options: UseLoginFormOptions) => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!"),
    password: Yup.string().min(6, "Your password must be minimum 6 characters long").required("Password is required!"),
  });

  return useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    isInitialValid: false,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: LoginSchema,
    onSubmit: async (values, formikHelpers) => {
      await options.onSubmit(values, formikHelpers);
    },
  });
};

export type LoginFormik = ReturnType<typeof useLoginFormik>;
