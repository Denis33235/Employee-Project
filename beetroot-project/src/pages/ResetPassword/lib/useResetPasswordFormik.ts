import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";

export interface NewPasswordFields {
  newPassword: string;
  confirmPassword: string;
}

interface UseNewPasswordFormOptions {
  initialValues?: NewPasswordFields;
  onSubmit: (values: NewPasswordFields, formikHelpers: FormikHelpers<NewPasswordFields>) => Promise<any>;
}

export const useResetPasswordFormik = (options: UseNewPasswordFormOptions) => {
  const LoginSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Your password must be minimum 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Your password do not match.")
      .required(),
  });

  return useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: LoginSchema,
    onSubmit: async (values, formikHelpers) => {
      await options.onSubmit(values, formikHelpers);
    },
  });
};

export type ResetPasswordFormik = ReturnType<typeof useResetPasswordFormik>;
