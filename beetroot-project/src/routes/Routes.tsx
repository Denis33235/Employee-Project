import { RouteObject, useRoutes } from "react-router-dom";
import { RouteWrapper } from "./RouteWrapper";
import { Error404 } from "../pages/Error404/Error404";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { ResetPassword } from "../pages/ResetPassword/ResetPassword";
import AddEmp from "../pages/AddEmp/AddEmp";

export enum RouteType {
  PUBLIC,
  PRIVATE,
  GUEST,
}

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <RouteWrapper routeType={RouteType.PRIVATE}>
        <Home />
      </RouteWrapper>
    ),
  },
  {
    path: 'add-employee',
    element: (
      <RouteWrapper routeType={RouteType.PRIVATE}>
        <AddEmp />
      </RouteWrapper>
    )
  },
  {
    path: 'update-emp/:empId',
    element: (
      <RouteWrapper routeType={RouteType.PRIVATE}>
        <AddEmp />
      </RouteWrapper>
    )
  },
  {
    path: "/login",
    element: (
      <RouteWrapper routeType={RouteType.PUBLIC}>
        <Login />
      </RouteWrapper>
    ),
  },
  {
    path: "/register",
    element: (
      <RouteWrapper routeType={RouteType.PUBLIC}>
        <Register />
      </RouteWrapper>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <RouteWrapper routeType={RouteType.PUBLIC}>
        <ResetPassword />
      </RouteWrapper>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
];

export const Routes = () => {
  const routes = useRoutes(appRoutes);

  return routes;
};
