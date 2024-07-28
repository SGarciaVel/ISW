import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { auth } = useContext(AuthContext);

  return <Route {...rest} element={auth ? <Element /> : <Navigate to="/" />} />;
};

export default PrivateRoute;
