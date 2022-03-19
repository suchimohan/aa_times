import * as React from 'react';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

class Props{
    isLoaded: any
    sections: ReadonlyArray<{
      title: string;
    }>

    constructor(isLoaded: any,sections:ReadonlyArray<{title: string;}>) {
        this.isLoaded = isLoaded;
        this.sections = sections
    }
};


function Navigation(props: Props){
 const {isLoaded, sections} = props
  // const isLoaded = props.isLoaded;
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
      <React.Fragment>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Button variant="outlined" size="small">
            <Link href="/">Home</Link>
          </Button>
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
