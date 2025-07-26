import { Box, Button, IconButton, Input, InputAdornment, InputLabel, List, ListItem, Paper } from "@mui/material";
import {  getUserById, getUserIdFromCookie, saveUpdate } from '../services/userService';
import {  ChangeEvent, useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function ProfileBox(){
    const PORT = 3002;
    const id = getUserIdFromCookie();
    const [isInputDisabled, setisInputDisabled] = useState(true);
    const [fn, setfn] = useState("");
    const [ln, setln] = useState("");
    const [un, setun] = useState("");
    const [pw, setpw] = useState("");
    const [pc, setpc] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const info =  await getUserById(id, PORT)
            setfn(info["message"]["firstName"]);
            setln(info["message"]["lastName"]);
            setun(info["message"]["userName"]);
            setpw(info["message"]["password"]);
            setpc(info["message"]["picture"]);
        };
        fetchData();
      }, []);
    
    function handleEdit(){
        setisInputDisabled(false);
    }
    const handleSave = ()=>{
        setisInputDisabled(true);
        saveUpdate(fn, ln, pc, un,pw, PORT);
    }

    // const [showPassword, setShowPassword] = useState(false);

    // const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //   event.preventDefault();
    // };
  
    // const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //   event.preventDefault();
    // };
    const handleFN = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setfn(event.target.value);
    }
    const handleLN = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setln(event.target.value);
    }
    const handleUN = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setun(event.target.value);
    }
    // const handlePW = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    //     setpw(event.target.value);
    // }
    const handlePC = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setpc(event.target.value);
    }

    return(
        <>
            <Box display="flex" justifyContent="center" alignItems="center" marginTop="50px">
                <Paper variant="outlined">
                    <img src={pc} alt="Loading" />
                </Paper>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <nav aria-label="profile-information">
                    <List>
                        <ListItem >
                            <InputLabel htmlFor="fname">First name:&nbsp; &nbsp; </InputLabel>
                            <Input
                                disabled = {isInputDisabled}
                                id="fname"
                                value={fn}
                                aria-describedby="component-helper-text"
                                onChange={handleFN}
                            />
                        </ListItem>
                        <ListItem >
                            <InputLabel htmlFor="lname">Last name: &nbsp; &nbsp;</InputLabel>
                            <Input
                                disabled = {isInputDisabled}
                                id="lname"
                                value={ln}
                                aria-describedby="component-helper-text"
                                onChange={handleLN}
                            />
                        </ListItem>
                        <ListItem >
                            <InputLabel htmlFor="username">Username:&nbsp; &nbsp; </InputLabel>
                            <Input
                                disabled = {true}
                                id="username"
                                value={un}
                                aria-describedby="component-helper-text"
                                onChange={handleUN}
                            />
                        </ListItem>
                        {/* <ListItem sx={{ display: isInputDisabled ? 'none' : 'block' }}>
                            <InputLabel htmlFor="password">Password:&nbsp; &nbsp; </InputLabel>
                            <Input
                                disabled = {isInputDisabled}
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={pw}
                                onChange={handlePW}
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
                        </ListItem> */}
                        <ListItem sx={{ display: isInputDisabled ? 'none' : 'block' }}>
                            <InputLabel htmlFor="picture" >Picture URL:&nbsp; &nbsp; </InputLabel>
                            <Input
                                disabled = {isInputDisabled}
                                id="picture"
                                value={pc}
                                aria-describedby="component-helper-text"
                                onChange={handlePC}
                            />
                        </ListItem>
                    </List>
                </nav>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <Button color="inherit" variant="contained" onClick={handleEdit} sx={{ display: isInputDisabled ? 'bloack' : 'none' }}>Edit </Button>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <Button color="inherit" variant="contained"  onClick={handleSave} sx={{ display: isInputDisabled ? 'none' : 'block' }}>Save </Button>
            </Box>
        </>
    );
}