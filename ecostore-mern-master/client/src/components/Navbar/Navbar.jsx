import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/user";
// Import mui componenets
import {
  Tooltip,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";

// Import Icons
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Import styles
import { styled } from "@mui/material/styles";
import "./Navbar.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  const searchRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout the user
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?search=${searchRef.current.value}`);
    searchRef.current.value = "";
  };

  const submitHandlerIcon = () => {
    navigate(`/search?search=${searchRef.current.value}`);
    searchRef.current.value = "";
  };
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-title">
        Ecoshop
      </NavLink>
      <Tooltip title="Search for a product">
        <form className="search-box" onSubmit={submitHandler}>
          <input type="text" placeholder="Search..." required ref={searchRef} />
          <SearchIcon className="icons" onClick={submitHandlerIcon} />
        </form>
      </Tooltip>
      {user.isLoggedIn ? (
        <ul className="navbar-list">
          <li>
            <Tooltip title="Saved products">
              <IconButton onClick={() => navigate("/profile/saved")}>
                <StyledBadge
                  badgeContent={user.user?.saved?.products?.length}
                  color="warning"
                  className="icons"
                >
                  <FavoriteIcon className="icons" />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Cart">
              <IconButton onClick={() => navigate("/profile/cart")}>
                <StyledBadge
                  badgeContent={user.user?.cart?.totalQte}
                  color="warning"
                >
                  <ShoppingCartIcon className="icons" />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Account">
              <IconButton onClick={handleClick}>
                <Avatar
                  alt="Remy Sharp"
                  src={user.user.user.image}
                  sx={{ width: 35, height: 35 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              id="avatar-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              <MenuItem onClick={() => navigate(`/profile`)}>Profile</MenuItem>
              <MenuItem onClick={() => navigate(`/profile/orders`)}>
                Orders
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </li>
        </ul>
      ) : (
        <button className="login-btn" onClick={() => navigate("/auth")}>
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
