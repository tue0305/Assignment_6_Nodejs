import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { userRouter } from "./router/user/userRouter";
import { adminRouter } from "./router/admin/adminRouter";
import UserTemplate from "./component/template/user/userTemplate";
import AdminTemplate from "./component/template/admin/adminTemplate";
import Login from "./component/admin/login/login";
import io from "socket.io-client";

function App() {
  //USER
  const ShowMenuHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <UserTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };
  //ADMIN
  const ShowMenuAdmin = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <AdminTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };
  /* -- */
  return (
    <BrowserRouter>
      <div>
        <Switch>
          {ShowMenuHome(userRouter)}
          {ShowMenuAdmin(adminRouter)}
          <Route path="/sign-in-admin" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
