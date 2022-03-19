import * as React from 'react';
// import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
// import './Navigation.css';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

class Props{
    isLoaded: any

    constructor(isLoaded: any) {
        this.isLoaded = isLoaded;
    }
};

function Navigation(props: Props){
  const isLoaded = props.isLoaded;
  const sessionUser = useSelector((state:any) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <Link href="/login"> Sign in </Link>
      </>
    );
  }

  return (
    // <ul>
    //   <li>
    //     <NavLink exact to="/">Home</NavLink>
    //     {isLoaded && sessionLinks}
    //   </li>
    // </ul>
      <React.Fragment>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Button size="small">Home</Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            AA TIMES
          </Typography>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Button variant="outlined" size="small">
            {isLoaded && sessionLinks}
          </Button>
        </Toolbar>
      </React.Fragment>
  );
}

export default Navigation;
