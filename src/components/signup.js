import { Button, TextField } from '@mui/material';
import React, {useState} from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Login () {
    const [username, setUsrname] = useState()
    const [password, setPassword] = useState()
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch(
            `http://127.0.0.1:5000/register?username=${username}&password=${password}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
             
        )
        console.log(response["access_token"]);
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
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label="Email Address"
                name='email'
                autoComplete='email'
                autoFocus
                onChange={(e)=>setUsrname(e.target.value)}
                />
            <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            label="Password"
            type="password"
            autoComplete='password'
            onChange={(e)=>setPassword(e.target.value)}
            />
            <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            label="Re Enter Password"
            type="password"
            autoComplete='password'
            />
            <Button
            type='submit'
            fullWidth
            variant='contained'
            // onClick={login}
            sx={{mt: 3, mb: 2}}
            >
                Sign Up
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href='/login' variant='body2'>
                            {"Have an account? Login"}
                        </Link>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    )
} 