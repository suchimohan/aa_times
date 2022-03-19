import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Signin from "./components/SigninFormPage"
import Signup from "./components/SignupFormPage"
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import TopStories from "./components/TopStories"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TitleBlock from './components/TitleBlock';



const sections = [
  {title: 'US'},
  { title: 'Business'},
  { title: 'Fashion'},
  { title: 'Health'},
  { title: 'Movies'},
  { title: 'Sports'},
  { title: 'Politics'},
  { title: 'Technology'},
  { title: 'Travel'},
];



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const theme = createTheme();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Navigation isLoaded={isLoaded} sections={sections}/>
          {isLoaded && (
          <Switch>
            <Route exact path="/">
              <TitleBlock />
              <TopStories/>
            </Route>
            <Route exact path="/topstories/:topic">
              <TitleBlock />
              <TopStories/>
            </Route>
            <Route path="/login" exact={true}>
              <Signin/>
            </Route>
            <Route path='/signup' exact={true}>
               <Signup/>
            </Route>
            <Route path="/">
              <h2>Page Not Found</h2>
            </Route>
          </Switch>
        )}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
