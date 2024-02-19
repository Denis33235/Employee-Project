import { apiRequest } from "../Api";
import { AddEmpRequest, EmpsResponseType, EmpResponseType } from "./employee.types";

export const allEmployees = async () =>
    await apiRequest<{}, EmpsResponseType>({
        url: "api/emps",
    });

export const getEmpById = async (empId: string) =>
    await apiRequest<{}, { emp: EmpResponseType }>({
        url: `api/emps/${empId}`,
    });

export const createEmp = async (emp: AddEmpRequest) =>
    await apiRequest<{ emp: AddEmpRequest }, { emp: AddEmpRequest }>({
        url: "api/emps",
        method: "POST",
data:emp
    });

export const editEmp = async (id: string, emp: AddEmpRequest) =>
    await apiRequest<{ emp: AddEmpRequest }, { emp: AddEmpRequest }>({
        url: `api/emps/${id}`,
        method: "PUT",
        data: emp ,
    });

export const deleteEmpApi = async (id: string) =>
    await apiRequest<{}, EmpsResponseType>({
        url: `api/emps/${id}`,
        method: "DELETE",
    });
