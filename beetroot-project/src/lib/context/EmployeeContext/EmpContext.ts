import React, { useContext } from "react";
import { AddEmpRequest, EmpResponseType } from "../../../api/Employees/employee.types";
import { FormDataType } from "../../../components/EmployeeForm/EmployeeForm";

interface EmpContextType {
  emps: EmpResponseType[];
  addNewEmp: (form: AddEmpRequest) => void;
  updateEmp: (id: string, form: FormDataType) => void;
  deleteEmp: (id: string) => void;
  selectedEmp?: EmpResponseType;
  selectEmp: (id: string) => void;
}

const values: EmpContextType = {
  emps: [],
  addNewEmp: () => { },
  updateEmp: () => { },
  selectedEmp: undefined,
  selectEmp: (id: string) => { },
  deleteEmp: (id: string) => { },
};

export const EmpsContext = React.createContext<EmpContextType>(values);

export const useEmpsContext = () => useContext(EmpsContext);
