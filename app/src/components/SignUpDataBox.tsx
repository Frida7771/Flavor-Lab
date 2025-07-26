import { Box, Button, IconButton, Input, InputAdornment, InputLabel, List, ListItem } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { signUp } from "../services/userService";

export default function SignUpDataBox(){
    const PORT = 3002;
    const navigate  = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [inputUserName, setinputUserName] = useState('');
    const [inputPassword, setinputPassword] = useState('');
    const [inputFName, setinputFName] = useState('');
    const [inputLName, setinputLName] = useState('');
    const [inputpic, setinputpic] = useState('');

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setinputUserName(event.target.value);
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setinputPassword(event.target.value);
    };
    const handleFChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setinputFName(event.target.value);
    };
    const handleLChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setinputLName(event.target.value);
    };
    const handlePicChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setinputpic(event.target.value);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    // handle sign up
    const handleSignUp = async () =>{
        if(inputUserName == "" || inputUserName == null){
            alert("Username can not be empty");
        }else if(inputPassword == "" || inputPassword == null){
            alert("password can not be empty");
        }else{
            try{
                await signUp(inputFName,inputLName,"user", inputpic,inputUserName,inputPassword, PORT);
                navigate(`/home`);
            }catch{
                console.error("sign up failed");
            }
        }
    }
    const handleCancel = ()=>{
        navigate("/");
    }

    return(
        <>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <nav aria-label="profile-information">
                    <List>
                        <ListItem >
                            <InputLabel htmlFor="fname">First name:&nbsp; &nbsp; </InputLabel>
                            <Input
                                id="fname"
                                aria-describedby="component-helper-text"
                                onChange={handleFChange}
                            />
                        </ListItem>
                        <ListItem >
                            <InputLabel htmlFor="lname">Last name: &nbsp; &nbsp;</InputLabel>
                            <Input
                                id="lname"
                                aria-describedby="component-helper-text"
                                onChange={handleLChange}
                            />
                        </ListItem>
                        <ListItem >
                            <InputLabel htmlFor="username">Username:&nbsp; &nbsp; </InputLabel>
                            <Input
                                id="username"
                                aria-describedby="component-helper-text"
                                onChange={handleUsernameChange}
                            />
                        </ListItem>
                        <ListItem >
                            <InputLabel htmlFor="username">Password:&nbsp; &nbsp; </InputLabel>
                            <Input
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
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
                        </ListItem>
                        <ListItem>
                            <InputLabel htmlFor="picture" >Picture URL:&nbsp; &nbsp; </InputLabel>
                            <Input
                                id="picture"
                                aria-describedby="component-helper-text"
                                onChange={handlePicChange}
                            />
                        </ListItem>
                    </List>
                </nav>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <Button color="inherit" variant="contained" onClick={handleSignUp}>Sign Up </Button>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <Button color="inherit" variant="contained"  onClick={handleCancel}>Cancel </Button>
            </Box>
        </>
    );
}