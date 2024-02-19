import { AddEmpRequest } from "../../api/Employees/employee.types";
import { ErrorFormDataType } from "../../components/EmployeeForm/EmployeeForm";

export const validate = (obj: AddEmpRequest): ErrorFormDataType => {
  const errors: ErrorFormDataType = {};
  if (!obj.name) errors.name = "This field is required";
  if (!obj.surname) errors.surname = "This field is required";
  if (!obj.age) errors.age = "This field is required";
  if (!obj.email) errors.email = "This field is required";
  if (!obj.img) errors.img = "This field is required";
  if (!obj.experience) errors.experience = "This field is required";
  if (!obj.status) errors.status = "This field is required";

  if (obj.age < 0) errors.age = "Age error: should be positive number";
  if (obj.experience < 0) errors.experience = "Experience error: should be positive number";
  return errors;
};
