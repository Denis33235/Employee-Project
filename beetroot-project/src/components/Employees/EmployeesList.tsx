import { useEmpsContext } from "../../lib/context/EmployeeContext/EmpContext";
import EmployeesTable from "./EmployeesTable";

const EmpsList = () => {
  const { emps: employees } = useEmpsContext();

  return (
    <div className="mt-2 bg-slate-300">
      {employees.length !== 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-blue-500 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 bg-blue-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 bg-blue-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-blue-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 bg-blue-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 bg-blue-100"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map(emp => (
              <EmployeesTable key={emp._id} emp={emp} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="ui icon message">
          <i className="icon info" />
          <div className="content">
            <div className="header">No employees in our database</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpsList;