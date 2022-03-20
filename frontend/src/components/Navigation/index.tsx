import * as React from 'react';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useDispatch} from "react-redux";
import * as sessionActions from "../../store/session";


class Props{
    isLoaded: any

    constructor(isLoaded: any) {
        this.isLoaded = isLoaded;
    }
};


function Navigation(props: Props){
  const {isLoaded} = props
  const sessionUser = useSelector((state:any) => state.session.user);
  const dispatch = useDispatch() as any;

  const sections = [
    { title: 'US'},
    { title: 'Business'},
    { title: 'Fashion'},
    { title: 'Health'},
    { title: 'Movies'},
    { title: 'Sports'},
    { title: 'Politics'},
    { title: 'Technology'},
    { title: 'Travel'},
  ];

  const signout = (e:any) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const handelDemo = () => {
    dispatch(sessionActions.login({credential : "demo@user.io", password: "password"}))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <Button variant="outlined" size="small">
          <Link href="/user" style={{ textDecoration: 'none' }}>{sessionUser.username}</Link>
        </Button>
        <Button  sx={{ ml: 2 }} variant="outlined" size="small" onClick={(e)=>signout(e)}>Sign Out</Button>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <Button variant="outlined" size="small">
          <Link href="/login" style={{ textDecoration: 'none' }}> Sign in </Link>
        </Button>
        <Button  sx={{ ml: 2 }} variant="outlined" size="small" onClick={()=>handelDemo()}>Demo</Button>
      </>
    );
  }

  return (
      <React.Fragment>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Button variant="outlined" size="small">
            <Link style={{ textDecoration: 'none' }} href="/">Home</Link>
          </Button>
          <Typography
            variant="h2"
            color="inherit"
            align="center"
            noWrap
            sx={{
              flex: 2,
              fontWeight: 'bold',
              fontFamily: 'Rockwell Extra Bold'
            }}
          >
            a / A Times
          </Typography>
          <Toolbar>
            {isLoaded && sessionLinks}
          </Toolbar>
        </Toolbar>
        <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
        >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={`/topstories/${(section.title).toLowerCase()}`}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      </React.Fragment>
  );
}

export default Navigation;
