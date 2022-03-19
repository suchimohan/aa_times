import * as React from 'react';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';
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
 const {isLoaded} = props
  const sessionUser = useSelector((state:any) => state.session.user);

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

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <Link href="/user">{sessionUser.username}</Link>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <Link href="/login"> Sign in </Link>
      </>
    );
  }

  return (
      <React.Fragment>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Button variant="outlined" size="small">
            <Link href="/">Home</Link>
          </Button>
          <Typography
            variant="h2"
            color="inherit"
            align="center"
            noWrap
            sx={{
              flex: 2,
              fontWeight: 'bold',
              fontFamily: 'URW Chancery L, cursive'
            }}
          >
            a / A Times
          </Typography>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Button variant="outlined" size="small">
            {isLoaded && sessionLinks}
          </Button>
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
