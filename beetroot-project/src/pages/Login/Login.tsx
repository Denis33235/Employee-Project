import { Link } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm/LoginForm";

export const Login = () => {

  return <div className="ui container mt-6">
    <LoginForm />
    <Link to="/register" className="flex flex justify-center hover:opacity-75">
      Register
    </Link>
  </div>
};
export default Login
