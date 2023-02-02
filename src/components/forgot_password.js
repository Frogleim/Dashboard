import { Button, TextField } from '@mui/material';
import React, {useState} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


async function login(creds) {
    return fetch(
        "http://127.0.0.1:5000/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: creds
        }
         
    ).then(data => data.json())
}

function handleSignUp()  {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/signup";
};


export default function ForgotPassword () {
    const [username, setUsrname] = useState()
    const [password, setPassword] = useState()
    console.log(username);
    console.log(password);
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await login(JSON.stringify({"username": username, "password": password}))
        if('access_token' in response) {
        localStorage.setItem("access_token", response["access_token"]);
        localStorage.setItem("user", JSON.stringify(response["user"]));
        window.location.href = "/home";
        
    }

    }
    return (
        <Box
        sx={{
            marginTop: 8, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
        >
            <Typography component="h1" variant="h5">
                Ooops! Sorry but this service currently unavailable
            </Typography>
           

        </Box>
    )
} 