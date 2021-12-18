import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
import Admin from '../../admin/index';

const AdminLayOut = (props) => {
	return (
		<Fragment>
			<Admin />
			{props.children}
		</Fragment>
	);
};
export default function AdminTemplate({Component, ...props }) {
    return (
        <Route
			{...props}
			render={(propsComponent) => (
				<AdminLayOut>
					<Component {...propsComponent} />
				</AdminLayOut>
			)}
		/>
    )
}
