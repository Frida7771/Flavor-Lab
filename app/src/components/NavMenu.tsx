import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const navItems = [
    { label: 'Comment', path: '/comment' },
    { label: 'Ingredient', path: '/ingredient' },
];

interface NavMenuProps {
    open: boolean;
    onClose: () => void;
    onSearch: (searchTerm: string) => void;
    navigate: (path: string) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ open, onClose, onSearch, navigate }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
        onClose();
    };

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: '100%',
                },
            }}
        >
            <Box p={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton onClick={onClose} color="inherit">
                        <CloseIcon />
                    </IconButton>
                    <TextField
                        variant="outlined"
                        placeholder="Search Recipes"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flexGrow: 1, marginRight: 1 }}
                    />
                    <IconButton onClick={handleSearch} color="primary">
                        <SearchIcon />
                    </IconButton>
                </Box>
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate(item.path);
                                    onClose();
                                }}
                            >
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default NavMenu;