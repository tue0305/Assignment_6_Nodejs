import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { useHistory } from "react-router-dom";
import Loading from "../screen/loading/loading";
//COMPONENT
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Post from "./pages/Post/post";
import Profile from "./pages/Profile";
//STYLE COMPONENT
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
//IMAGES
import logo from "../../images/logo/cooking.png";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function DashboardAdmin() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const history = useHistory();
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    localStorage.clear("accessToken");
    history.push("/sign-in-admin");
  };
  return (
    <div className="dash-board">
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
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
                  <Link to="/admin/Home">
                    <span className="dash-board-logo">
                      <img src={logo} alt="logo" />
                      <span className="navbar-title-name">WELLCOME BACK</span>
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
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
              {/* Sidebar  */}
              <Divider />
              <List>
                <ListItem onClick={logout}>
                  <PeopleAltIcon />
                  <ListItemText primary="Logout" />
                </ListItem>
                <Link to="/admin/manage-comment">
                  <ListItem>
                    <PeopleAltIcon />
                    <ListItemText primary="Manage Comment" />
                  </ListItem>
                </Link>
                <Link to="/admin/manage-user">
                  <ListItem>
                    <PeopleAltIcon />
                    <ListItemText primary="Manage User" />
                  </ListItem>
                </Link>
                <Link to="/admin/manage-post">
                  <ListItem>
                    <PeopleAltIcon />
                    <ListItemText primary="Manage Post" />
                  </ListItem>
                </Link>
              </List>
            </Drawer>
            {/* end sidebar  */}
            {/* màn hình  */}
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />

              <Switch>
                <Route exact path="/admin/manage-comment">
                  <Billing />
                </Route>
                <Route exact path="/admin/Home">
                  <Home />
                </Route>
                <Route exact path="/admin/manage-user">
                  <Tables />
                </Route>
                {/* <Route exact path="/admin/manage-post">
 								<Profile/>
 							</Route> */}
                <Route exact path="/admin/manage-post">
                  <Post />
                </Route>
                <Redirect from="*" to="/manage-comment" />
              </Switch>
            </main>
            {/* end màn hình */}
          </div>
        </Router>
      )}
    </div>
  );
}
