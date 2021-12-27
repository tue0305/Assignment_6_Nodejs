import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom';
import Login from '../../admin/login/login';
const AdminLayOut = (props) => {
	return (
		<Fragment>
			{props.children}
		</Fragment>
	);
};
export default function AdminTemplate({Component, ...props }) {
    return (
        <Route
			{...props}
			render={(propsComponent) => {
				// if (localStorage.getItem("userAdmin")) {
					return (
						<AdminLayOut>
							<Component {...propsComponent} />
						</AdminLayOut>
					);
				// } else {
				// 	return <Redirect to="/sign-in-admin" />, <Login/> ;
				// }
			}}
		/>
    )
}