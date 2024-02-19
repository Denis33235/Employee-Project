import { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../shared/Button/Button";

import { resetPassword } from "../../api/Users/user.client";
import { useResetPasswordFormik } from "../../pages/ResetPassword/lib/useResetPasswordFormik";
import { PasswordField } from "../shared/PasswordField/PasswordField";

export const ResetPasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const formik = useResetPasswordFormik({
        onSubmit: async (values) => {
            const token = params.get("token");

            if (!token) {
                return toast.error("Invalid token");
            }

            try {
                setIsLoading(true);

                await resetPassword(
                    {
                        new_password: values.newPassword,
                        confirm_password: values.confirmPassword,
                    },
                    token,
                );

                toast.success("Your password has been changed successfully");
                setTimeout(() => {
                    return navigate("/login");
                }, 500);
            } catch (error: any) {
                toast.error(error);
            }
        },
    });

    const handleFormikChange = (name: string, value: string | number) => {
        formik.setFieldTouched(name);
        formik.setFieldValue(name, value);
    };

    return (
        <form className="max-w-[350px]" onSubmit={formik.handleSubmit}>
            <h1 className="text-secondary whitespace-nowrap text-[2.75rem] leading-[3.5rem] 3xl:text-[3.25rem] 3xl:leading-[3.875rem] font-bold mb-[54px]">
                Set new password
            </h1>
            <div className="mb-[24px]">
                <PasswordField
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    placeholder="******"
                    value={formik.values.newPassword}
                    onChange={(name: string, value: string | number) => handleFormikChange(name, value)}
                    error={formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : ""}
                />
                <p
                    className={`${formik.touched.newPassword && formik.errors.newPassword ? "hidden" : null
                        } text-grey-darker text-[13px] pl-[5px] mt-[5px] font-semibold italic`}
                >
                    Hint: Password should include at least one capital letter, a lowercase letter, a digit and a special character
                    at the minimum.
                </p>
            </div>
            <div className={formik.errors.confirmPassword ? "mb-[25px]" : "mb-[2px]"}>
                <PasswordField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="******"
                    value={formik.values.confirmPassword}
                    onChange={(name: string, value: string | number) => handleFormikChange(name, value)}
                    error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}
                />
            </div>

            <span className={`block text-blue underline mb-[28px] ${formik.errors.confirmPassword ? "mt-5" : ""}`}>
                <NavLink to={"/login"}>Go to login?</NavLink>
            </span>

            <Button color="blue" className="mb-[10px] max-w-[350px]" loading={isLoading}>
                Submit{" "}
            </Button>
        </form>
    );
};
