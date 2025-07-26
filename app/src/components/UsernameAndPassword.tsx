import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from 'react';
import { checkUser, handleGoogle } from '../services/userService';
import Input from '@mui/material/Input';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/authSlice';
import { RootState } from '../services/store';
import { getUserIdFromCookie, getUserNameFromCookie } from '../services/userService';


export default function UserNameAndPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useSelector((state: RootState) => state.auth);

    const PORT = 3002;
    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    /**
     * navigate to home page
     */
    const gotToHomePage = () => {
        navigate("/home/guest");
    };
    /**
     * log in based on inputUserName andinputPassword
     */
    const handleLogin = async () => {
        if (inputUserName === "" || inputPassword === "") {
            alert('Username / password cannot be empty');
        } else {
            try {
                await checkUser(inputUserName, inputPassword, PORT);
                // Fetch userId and userName from cookies after successful login
                const userId = getUserIdFromCookie();
                const userName = getUserNameFromCookie();

                if (userId && userName) {
                    // Dispatch login action with fetched values
                    dispatch(login({ username: userName, userid: userId, password: "" }));
                } else {
                    console.error("Failed to retrieve userId or userName from cookies.");
                }
                navigate("/home");
            } catch {
                alert('Username / password is incorrect');
            }
        }
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputUserName(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputPassword(event.target.value);
    };

    const handleSignUp = () => {
        navigate("/user");
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            await handleGoogle(credentialResponse, PORT).then(() => {
                // Dispatch login action on success
                dispatch(login({ username: 'Google User', userid: "", password: credentialResponse.clientId! }));
                navigate("/home");
                console.log('Login success');
            });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLoginError = () => {
        console.error("Login Failed");
    };
    // Switch language
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            {/* Change language buttons */}
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('es')}>Español</button>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <h1>{t('welcome')}</h1>
            </Box>
            {/* username and password input field */}
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px"
                component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
                <InputLabel htmlFor="username">{t('username')}</InputLabel>
                <Input required id="username" aria-required value={inputUserName} onChange={handleUsernameChange} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px"
                component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
                <InputLabel htmlFor="password">{t('password')}</InputLabel>
                <Input
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={inputPassword}
                    onChange={handlePasswordChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <Button variant="outlined" onClick={handleLogin}>{t('login')}</Button>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <Button variant="outlined" onClick={gotToHomePage}>{t('guest')}</Button>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <Button variant="outlined" onClick={handleSignUp}>{t('signup')}</Button>
            </Box>
            {/* handle google login */}
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
            </Box>
        </>
    );
}
