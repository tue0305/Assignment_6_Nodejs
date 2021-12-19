import React from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
//COMPONENT
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
//STYLE COMPONENT 
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
//IMAGES
import logo from '../../images/logo/cooking.png';
 const drawerWidth = 240;

 const useStyles = makeStyles((theme) => ({
 	root: {
 		display: 'flex'
 	},
 	appBar: {
 		transition: theme.transitions.create(['margin', 'width'], {
 			easing: theme.transitions.easing.sharp,
 			duration: theme.transitions.duration.leavingScreen
 		})
 	},
 	appBarShift: {
 		width: `calc(100% - ${drawerWidth}px)`,
 		marginLeft: drawerWidth,
 		transition: theme.transitions.create(['margin', 'width'], {
 			easing: theme.transitions.easing.easeOut,
 			duration: theme.transitions.duration.enteringScreen
 		})
 	},
 	menuButton: {
 		marginRight: theme.spacing(2)
 	},
 	hide: {
 		display: 'none'
 	},
 	drawer: {
 		width: drawerWidth,
 		flexShrink: 0
 	},
 	drawerPaper: {
 		width: drawerWidth
 	},
 	drawerHeader: {
 		display: 'flex',
 		alignItems: 'center',
 		padding: theme.spacing(0, 1),
 		// necessary for content to be below app bar
 		...theme.mixins.toolbar,
 		justifyContent: 'flex-end'
 	},
 	content: {
 		flexGrow: 1,
 		padding: theme.spacing(3),
 		transition: theme.transitions.create('margin', {
 			easing: theme.transitions.easing.sharp,
 			duration: theme.transitions.duration.leavingScreen
 		}),
 		marginLeft: -drawerWidth
 	},
 	contentShift: {
 		transition: theme.transitions.create('margin', {
 			easing: theme.transitions.easing.easeOut,
 			duration: theme.transitions.duration.enteringScreen
 		}),
 		marginLeft: 0
 	}
 }));

 export default function DashboardAdmin() {
 	const classes = useStyles();
 	const theme = useTheme();
 	const [open, setOpen] = React.useState(false);
 	const handleDrawerOpen = () => {
 		setOpen(true);
 	};
 	const handleDrawerClose = () => {
 		setOpen(false);
 	};
 	return (
 		<div className='dash-board'> 
 			<Router>
 				<div className={classes.root}>
 					<CssBaseline />
 					<AppBar
 						position="fixed"
 						className={clsx(classes.appBar, {
 							[classes.appBarShift]: open
 						})}
 					>
 						<Toolbar>
 							<IconButton
 								color="inherit"
 								aria-label="open drawer"
 								onClick={handleDrawerOpen}
 								edge="start"
 								className={clsx(classes.menuButton, open && classes.hide)}
 							>
 								<MenuIcon />
 							</IconButton>
 							<Typography variant="h6" noWrap>
 								<Link to='/admin/Home'>
								 <span className='dash-board-logo'>
 									<img src={logo} alt='logo' />
 									<span className='navbar-title-name'>
 										WELLCOME BACK
 									</span>
 								</span>
								</Link>
 							</Typography>
 						</Toolbar>
 					</AppBar>
 					<Drawer
 						className={classes.drawer}
 						variant="persistent"
 						anchor="left"
 						open={open}
 						classes={{
 							paper: classes.drawerPaper
 						}}
 					>
 						<div className={classes.drawerHeader}>
 							<IconButton onClick={handleDrawerClose}>
 								{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
 							</IconButton>
 						</div>
 						{/* Sidebar  */}
 						<Divider />
 						<List>
 							<Link to="/admin/manage-user">
 								<ListItem>
 									<PeopleAltIcon />
 									<ListItemText primary="Quản lí người dùng" />
 								</ListItem>
 							</Link>
							 <Link to="/admin/Home">
 								<ListItem>
 									<PeopleAltIcon />
 									<ListItemText primary="Quản lí người dùng" />
 								</ListItem>
 							</Link>
							 <Link to="/admin/tables">
 								<ListItem>
 									<PeopleAltIcon />
 									<ListItemText primary="Quản lí người dùng" />
 								</ListItem>
 							</Link>
							 <Link to="/admin/rtl">
 								<ListItem>
 									<PeopleAltIcon />
 									<ListItemText primary="Quản lí người dùng" />
 								</ListItem>
 							</Link>
							 <Link to="/admin/profile">
 								<ListItem>
 									<PeopleAltIcon />
 									<ListItemText primary="Quản lí người dùng" />
 								</ListItem>
 							</Link>
 						</List>
 					</Drawer>
 					{/* end sidebar  */}
 					{/* màn hình  */}
 					<main
 						className={clsx(classes.content, {
 							[classes.contentShift]: open
 						})}
 					>
 						<div className={classes.drawerHeader} />
						 
 						<Switch>
 							<Route exact path="/admin/manage-user">
 								<Billing/>
 							</Route>
							 <Route exact path="/admin/Home">
 								<Home/>
 							</Route>
							 <Route exact path="/admin/tables">
 								<Tables/>
 							</Route>
							 <Route exact path="/admin/rtl">
 								<Rtl/>
 							</Route>
							 <Route exact path="/admin/profile">
 								<Profile/>
 							</Route>
							 <Redirect from="*" to="/admin" />
 						</Switch>
 					</main>
 					{/* end màn hình */}
 				</div>
 			</Router>
 		</div>
 	);
 }
