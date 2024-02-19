import { toast } from "react-toastify";
import Input from "../shared/Input/Input";
import Button from "../shared/Button/Button";
import { register } from "../../api/Users/user.client";
import { useRegisterFormik } from "../../lib/hooks/useRegisterFormik";
import { NavLink, useNavigate } from "react-router-dom";


export const RegisterForm = () => {
  const navigate = useNavigate();
  const formik = useRegisterFormik({

    onSubmit: async (values, formikHelpers) => {
      try {
        await register(values);
        toast.success("Registered successfully");
        formikHelpers.resetForm();
      } catch (error: any) {
        console.log({ error: Object.keys(error.response.data.errors) })

        Object.keys(error.response.data.errors).map(key => {
          toast.error(error.response.data.errors[key] ?? "Something went wrong")
        })
      }
    },
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="LoginForm">
        <form className="mb-3 w-[300px]" onSubmit={formik.handleSubmit}>
          <h2 className="mt-8 mb-6 text-3xl font-bold text-left text-slate-600 md:mt-0">Sign up</h2>

          <Input
            className="mb-2.5 w-[100%]"
            id="email"
            name="email"
            placeholder="Email Address"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.errors.email}
            touched={formik.touched.email}
          />

          <Input
            className="mb-2.5 w-[100%]"
            type="password"
            name="password"
            id="password"
            placeholder={"Password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
          />

          <Input
            className="mb-2.5 w-[100%]"
            type="password"
            name="passwordConfirmation"
            id="password"
            placeholder={"Password Confirmation"}
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.passwordConfirmation}
            touched={formik.touched.passwordConfirmation}
          />

          <Button className="w-[100%] uppercase rounded-md" type="submit" loading={formik.isSubmitting}>
            Sign in
          </Button>
          <span className="text-blue underline ml-[61px] mb-[28px] block hover:text-sky-300">
            <NavLink to={"/login"}>Already have an account?</NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}
