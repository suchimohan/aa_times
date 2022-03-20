import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SigninPage from "./components/SigninFormPage"
import SignupPage from "./components/SignupFormPage"
import UserPage from "./components/UserPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import TopStories from "./components/TopStories"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TitleBlock from './components/TitleBlock';
import Footer from './components/Footer'

function App() {
  const dispatch = useDispatch() as any;
  const [isLoaded, setIsLoaded] = useState(false);

  const theme = createTheme();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Navigation isLoaded={isLoaded}/>
          {isLoaded && (
          <Switch>
            <Route exact path="/">
              <TitleBlock title="Top Stories"/>
              <TopStories/>
              <Footer />
            </Route>
            <Route exact path='/topstories/:topic'>
              <TitleBlock title= "" />
              <TopStories/>
              <Footer />
            </Route>
            <Route path="/login" exact={true}>
              <SigninPage/>
            </Route>
            <Route path='/signup' exact={true}>
               <SignupPage/>
            </Route>
            <Route path='/user' exact={true}>
               <UserPage/>
               <Footer />
            </Route>
            <Route path="/">
              <h2>Page Not Found</h2>
            </Route>
          </Switch>
        )}
        </Container>
      </ThemeProvider>
  );
}

export default App;
