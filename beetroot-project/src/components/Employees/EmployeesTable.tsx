import { useEmpsContext } from "../../lib/context/EmployeeContext/EmpContext";
import { useState } from "react";
import ReactImageFallback from "react-image-fallback";
import { useNavigate } from "react-router-dom";
import { EmpResponseType } from "../../api/Employees/employee.types";
import { deleteEmpApi } from "../../api/Employees/employee.client";


interface Props {
  emp: EmpResponseType,
}

const EmployeesTable = ({ emp }: Props) => {
  const { selectEmp,deleteEmp } = useEmpsContext();
  const navigate = useNavigate();
  const [zoomed, setZoomed] = useState(false);

  const deleteEmpHandler = () => {
    deleteEmpApi(emp._id).then(() => {
      deleteEmp(emp._id)
    }).catch(err => { console.log(err) })
  };

  const toggleZoom = () => {
    setZoomed(!zoomed);
  };

  return (
    <tr className="bg-slate-400 rounded-sm border-b border-gray-200 hover:bg-blue-100">
      <td className="px-6 py-4 whitespace-no-wrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <ReactImageFallback
              src={emp.img}
              fallbackImage="https://via.placeholder.com/150"
              alt="Employee Image"
              className="h-10 w-10 rounded-full cursor-pointer hover:scale-150 transition-transform duration-300 ease-in-out"
              onClick={toggleZoom}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm leading-5 font-medium text-gray-900">
              {emp.name}
            </div>
            <div className="text-sm leading-5 text-gray-900">{emp.surname}</div>
          </div>
        </div>
        {zoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={toggleZoom}></div>
            <div className="bg-white p-4 rounded-lg">
              <ReactImageFallback
                src={emp.img}
                fallbackImage="https://via.placeholder.com/350"
                alt="Employee Image"
                className="max-h-screen max-w-screen cursor-pointer"
                onClick={toggleZoom}
              />
            </div>
          </div>
        )}
      </td>
      <td className="px-8 py-4 whitespace-no-wrap">{emp.age}</td>
      <td className="px-6 py-4 whitespace-no-wrap">{emp.email}</td>
      <td className="px-14 py-4 whitespace-no-wrap">{emp.experience}</td>
      <td className="px-6 py-4 whitespace-no-wrap">{emp.status}</td>
      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
        <button
          onClick={() => { navigate(`update-emp/${emp._id}`) }}
          className=" py-2 px-2  hover:bg-slate-500 rounded-lg"
        >
          Edit
        </button>
        <button
          onClick={() => deleteEmpHandler()}
          className="py-2 px-2 bg-slate-400 hover:bg-red 300 rounded-lg my-2 mx-2 "
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeesTable;
