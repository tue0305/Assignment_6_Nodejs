import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PhoneIcon from "@material-ui/icons/Phone";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
//IMAGES
import logo from "../../../images/logo/cooking.png";
import { getInformationUserAPI } from "../../../redux/actions/user/signIn-signUp/userSignIn";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const divAvater = {
  marginLeft: "115px",
};
const divLink = {
  textDecoration: "non",
  color: "black",
};
export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const history = useHistory();
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.SignUser);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.clear("accessToken");
    localStorage.setItem("prevLocation", location?.pathname || "");
    history.push("/");
  };
  useEffect(() => {
    localStorage.getItem("accessToken") && dispatch(getInformationUserAPI());
  }, []);
  const isLogin = () => {
    if (localStorage.getItem("accessToken")) {
      //Logged
      return (
        <>
          {user && (
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <div className="Navbar-Img" style={divAvater}>
                  <Avatar>
                    <img src={user.avatar} />
                  </Avatar>
                </div>
              </Button>
              <div className="Navbar-Menu">
                <StyledMenuItem
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <ListItemIcon>
                    <>
                      <NavLink exact to={{ pathname: "/profile-user" }}>
                        <MenuItem onClick={handleClose} style={divLink}>
                          Thông tin cá nhân
                        </MenuItem>
                      </NavLink>
                    </>
                  </ListItemIcon>
                  <ListItemIcon>
                    <MenuItem onClick={handleClose} onClick={logout} href="# ">
                      Đăng xuất
                    </MenuItem>
                  </ListItemIcon>
                </StyledMenuItem>
                {/* --- */}
                <StyledMenuItem
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <ListItemIcon>
                    <>
                      <NavLink
                        exact
                        to={{ pathname: `/post-user/${user._id}` }}
                      >
                        <MenuItem onClick={handleClose} style={divLink}>
                          Đăng bài viết
                        </MenuItem>
                      </NavLink>
                    </>
                  </ListItemIcon>
                </StyledMenuItem>
              </div>
            </div>
          )}
        </>
      );
    }
    // check Not logged in
    return (
      <Link to="/sign-in">
        <StyledMenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign In" className="Navbar-icon-title" />
        </StyledMenuItem>
      </Link>
    );
  };

  return (
    <div id="Navbar">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                // color="primary"
                onClick={handleClick}
              />
              <div>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem>{isLogin()}</StyledMenuItem>
                  <StyledMenu></StyledMenu>
                  <StyledMenuItem>
                    <ListItemIcon>
                      <PhoneIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Call +020220202" />
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemIcon>
                      <ShoppingCartIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Cart" />
                  </StyledMenuItem>
                </StyledMenu>
              </div>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link to="/" className="navbar-title">
                <span>
                  <img src={logo} alt="logo" />
                  <span className="navbar-title-name">NẤU ĂN NÈ</span>
                </span>
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
