import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const navItems = [
    { label: 'My Comment', path: '/comment' },
    { label: 'Ingredient', path: '/ingredient' },
];

export default function NavigationButtons() {
    const navigate = useNavigate();
    return (
        <>
            {navItems.map((item) => (
                <Button
                    key={item.label}
                    color="inherit"
                    sx={{ my: 0, display: 'block' }}
                    onClick={() => navigate(item.path)}
                >
                    {item.label}
                </Button>
            ))}
        </>
    );
}