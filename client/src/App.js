import React  from 'react';
import './App.css';
import { BrowserRouter,  Switch } from 'react-router-dom';
import {userRouter} from "./router/user/userRouter";
import UserTemplate from './component/template/user/userTemplate';


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
          {ShowMenuHome(userRouter)}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
