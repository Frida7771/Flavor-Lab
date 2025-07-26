import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getUserIdFromCookie, signOut } from '../services/userService';
import { useDispatch } from 'react-redux';
import { logout } from '../services/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';

interface SinglePageMenuAppBarProps {
  pageName: string;
}

export default function SinglePageMenuAppBar({ pageName }: SinglePageMenuAppBarProps) {
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // go to login page
  const goToLoginPage = () => {
    signOut();
    dispatch(logout());
    navigate('/');
  };
  // go to user page by get user id from cookie
  const goToUserPage = () => {
    const id = getUserIdFromCookie();
    navigate(`/userprofile/${id}`);
  };
  // go to last page
  const goToLastPage = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* Back arrow to return to last page */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="return-back-to-home-page"
            sx={{ mr: 2 }}
            onClick={goToLastPage}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageName}
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={goToUserPage}>Profile</MenuItem>
                <MenuItem onClick={goToLoginPage}>Sign out</MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (
            <Button color="inherit" onClick={goToLoginPage}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
