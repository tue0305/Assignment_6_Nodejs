import React from 'react';
import { hot } from "react-hot-loader";
import { BrowserRouter,  Switch, Route } from 'react-router-dom';
import {routerUser} from "./router/routerUser";
import UserTemplate from "./component/template/userTemplate";

function App() {
  //User
  const ShowMenuHome = (routes) => {
		if (routes && routes.length > 0) {
			return routes.map((item, index) => {
				return <UserTemplate key={index} exact={item.exact} path={item.path} Component={item.component} />;
			});
		}
	};
  return (
    <BrowserRouter>
      <div>
        <Switch>
          {ShowMenuHome(routerUser)}
        </Switch>
        
      </div>
    </BrowserRouter>
    
  )
}
export default hot(module)(App);
