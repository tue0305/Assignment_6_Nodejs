import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Navbar from "../../screen/navbar/navbar";
import Footer from "../../screen/footer/footer";
const HomeLayOut = (props) => {
  return (
    <Fragment>
      <Navbar />
      {props.children}
      <Footer />
    </Fragment>
  );
};
export default function UserTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => (
        <HomeLayOut>
          <Component {...propsComponent} />
        </HomeLayOut>
      )}
    />
  );
}
