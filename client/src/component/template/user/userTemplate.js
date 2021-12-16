import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
import Navbar from '../../screen/navbar/navbar';

const HomeLayOut = (props) => {
	return (
		<Fragment>
			<Navbar />
			{props.children}
		</Fragment>
	);
};
export default function UserTemplate({Component, ...props }) {
    return (
        <Route
			{...props}
			render={(propsComponent) => (
				<HomeLayOut>
					<Component {...propsComponent} />
				</HomeLayOut>
			)}
		/>
    )
}
