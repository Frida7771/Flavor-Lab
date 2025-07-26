import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { getUserIdFromCookie, signOut } from '../services/userService';
import { useDispatch } from 'react-redux';
import { logout } from '../services/authSlice';
import NavMenu from './NavMenu';
import NavigationButtons from './NavigationButtons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { RootState } from '../services/store';
import { useSelector } from 'react-redux';


export default function MenuAppBar({
    isGuest,
    onSearch,
}: {
    isGuest: boolean;
    onSearch: (searchTerm: string) => void;
}) {
    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
    const [navOpen, setNavOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setProfileAnchorEl(null);
    };

    const gotToLoginPage = () => {
        navigate('/');
    };

    const gotToGuestHome = () => {
        signOut();
        dispatch(logout());
        navigate('/home/guest');
    };

    const goToUserPage = () => {
        const id = getUserIdFromCookie();
        navigate(`/userprofile/${id}`);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* Hamburger Icon for Small Screens */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}
                        onClick={() => setNavOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* Home Title */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontFamily: '"Lobster", cursive',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Flavor Lab
                    </Typography>
                    {/* Search Bar for Larger Screens */}
                    <TextField
                        variant="outlined"
                        placeholder="Search Recipes"
                        size="small"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 1,
                            mr: 3,
                            display: { xs: 'none', md: 'flex' },
                        }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {/* Navigation Buttons for Larger Screens */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <NavigationButtons />
                    </Box>
                    {/* User Account Section */}
                    {auth ? (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="profile-menu"
                                aria-haspopup="true"
                                onClick={handleProfileMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
  id="profile-menu"
  anchorEl={profileAnchorEl}
  open={Boolean(profileAnchorEl)}
  onClose={handleCloseProfileMenu}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
>
  <MenuItem onClick={goToUserPage}>Profile</MenuItem>
  <MenuItem onClick={gotToGuestHome}>Logout</MenuItem>
</Menu>
                        </div>
                    ) : (
                        <Button color="inherit" onClick={gotToLoginPage}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            {/* Full Width Nav Menu for Small Screens */}
            <NavMenu
                open={navOpen}
                onClose={() => setNavOpen(false)}
                onSearch={(term) => {
                    setSearchTerm(term);
                    onSearch(term);
                }}
                navigate={navigate}
            />
        </Box>
    );
}