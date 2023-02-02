import { Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function handleClick()  {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
};


export default function  Home()  {
  const [exams, setExams] = useState({})
  useEffect(() => {
    async function fetchData(){
        const accessToken = localStorage.getItem('access_token');
        console.log(accessToken);
        const user_id = localStorage.getItem("user")
        console.log(typeof user_id);
        

        const res  = await fetch(
            `http://127.0.0.1:5000/read_marks?id=${user_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth": `${accessToken}`
                },
            },

        )
        const data = await res.json()
        setExams(data)
    }
    fetchData();
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button  color="inherit" onClick={handleClick}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Card sx={{ minWidth: 275}}>
     <CardContent>
     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Exam result
        </Typography>
        <Typography variant="h5" component="div">
          Your score is: {exams.mark} /10
          {exams.mark >=5? (
            <p>You passed</p>
          ) : (
            <p>You didnt passed</p>
          )}
        </Typography>
     </CardContent>
    </Card>
    </Box>
  );
}