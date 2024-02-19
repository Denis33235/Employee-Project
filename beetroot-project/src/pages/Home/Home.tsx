import _sortBy from "lodash/package.json"
import _orderBy from "lodash/orderBy"
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import { useAuthContext } from "../../lib/context/AuthContext/AuthContext";
import EmployeesList from "../../components/Employees/EmployeesList.tsx";
import EmpContextProvider from "../../lib/context/EmployeeContext/EmpContextProvider.tsx";

export const Home = () => {
  const { logout } = useAuthContext();
  return (
    <EmpContextProvider>
      <div className="ui container mt-6">
        <div className="flex justify-between">
          <Button className="ml-5 hover:bg-slate-600 rounded-sm">
            <Link to="/add-employee" >Add Employee</Link>
          </Button>
          <Button onClick={logout} className="mr-5 hover:bg-slate-600 rounded-sm">
            Logout
          </Button>
        </div>
        <EmployeesList />
      </div>
    </EmpContextProvider>
  );
};
