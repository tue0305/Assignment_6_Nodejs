import React  from 'react';
import { BrowserRouter,  Switch } from 'react-router-dom';
import {userRouter} from "./router/user/userRouter";
import AdminRouter from './router/admin/adminRouter';
import UserTemplate from './component/template/user/userTemplate';
import AdminTemplate from './component/template/admin/adminTemplate';

function App() {
  //USER
  const ShowMenuHome = (routes) => {
		if (routes && routes.length > 0) {
			return routes.map((item, index) => {
				return <UserTemplate key={index} exact={item.exact} path={item.path} Component={item.component} />;
			});
		}
	};
  //ADMIN
  const ShowMenuAdmin = (routes) => {
		if (routes && routes.length > 0) {
			return routes.map((item, index) => {
				return <AdminTemplate key={index} exact={item.exact} path={item.path} Component={item.component} />;
			});
		}
	}; 
  /* -- */
  return (
    <BrowserRouter>
      <div>
        <Switch>
          {ShowMenuHome(userRouter)}
          {ShowMenuAdmin(AdminRouter())}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
