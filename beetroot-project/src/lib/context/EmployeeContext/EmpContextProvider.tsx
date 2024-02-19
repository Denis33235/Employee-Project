import { useEffect, useState } from "react";
import { EmpsContext } from "./EmpContext";
import _orderBy from "lodash/orderBy"
import { FormDataType } from "../../../components/EmployeeForm/EmployeeForm";
import { randomId } from "../../helpers/randomId";
import { allEmployees } from "../../../api/Employees/employee.client";
import { EmpResponseType } from "../../../api/Employees/employee.types";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}


const EmpContextProvider = ({ children }: Props) => {
  const [emps, setEmps] = useState<EmpResponseType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate()

  const [selectedEmp, setSelectedEmp] = useState<EmpResponseType | undefined>();

  useEffect(() => {
    setLoading(true);
    allEmployees().then(response => {
      setEmps(response.data.emps)
    }).catch(err => {
      console.log(err)
      setError(err?.message ?? 'Something went wrong')
    }).finally(() => {
      setLoading(false)
    });
  }, [])




  const selectEmp = (id: string) => {
    setSelectedEmp(emps.find(emp => emp._id === id))
  }

  const addNewEmp = (form: FormDataType) => {
    setEmps([...emps, { ...form, _id: randomId(), img: 'https://placehold.co/600x400/EEE/31343C' }])
  }

  const updateEmp = (id: string, form: FormDataType) => {
    setEmps(emps.map(emp => emp._id === id ? { ...emp, ...form } : emp))
  }

  const deleteEmp = (id: string) => {
    setEmps(emps.filter(emp => emp._id !== id))
  }

  return (
    <EmpsContext.Provider value={{
      emps,
      addNewEmp,
      updateEmp,
      deleteEmp,
      selectedEmp,
      selectEmp,
    }}>
      {error ? error : loading ? <div>loading ...</div> : children}
    </EmpsContext.Provider>
  )
}

export default EmpContextProvider;
