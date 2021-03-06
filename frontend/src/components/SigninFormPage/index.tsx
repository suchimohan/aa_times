import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Redirect } from "react-router-dom";
import ErrorList from "../ErrorList";
import Error from "../../models/Error"


export default function SignIn() {

  const dispatch = (useDispatch() as any);
  const sessionUser = useSelector((state:any) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const emptyErrors:Error[]= [];
  const [errors, setErrors] = useState(emptyErrors);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res:any) => {
        const data = await res.json();
        let errorList:Error[]= [];
        if (data && data.errors) {
          for (let i = 0; i < data.errors.length; i++) {
            errorList.push(new Error(i, data.errors[i]))
          }
          setErrors(errorList);
        }
      });
  };

  return (
      <>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <ErrorList errors={errors}/>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoFocus
              onChange={(e:any) => setCredential(e.target.value)}
              // error={errors.email ? true : false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              onChange={(e:any) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </>
  );
}
