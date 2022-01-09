import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
const AdminLayOut = (props) => {
  return <Fragment>{props.children}</Fragment>;
};
export default function AdminTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        if (localStorage.getItem("accessToken")) {
          return (
            <AdminLayOut>
              <Component {...propsComponent} />
            </AdminLayOut>
          );
        } else {
          return <Redirect to="/sign-in-admin" />;
        }
      }}
    />
  );
}
