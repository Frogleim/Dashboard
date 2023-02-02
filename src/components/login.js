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


export default function Login () {
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
                Sign In
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
            <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="Remember me"
            />
            <Button
            type='submit'
            fullWidth
            variant='contained'
            // onClick={login}
            sx={{mt: 3, mb: 2}}
            >
                Sign In

                </Button>

                <Grid container>
                    <Grid item xs>
                        <Link href='/forgotpassword' variant='body2'>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href='/signup' variant='body2'>
                            {"Don't  have account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>

            </Box>

        </Box>
    )
} 