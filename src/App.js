import React from 'react'
import styled from 'styled-components'
import GlobalStyles from './globalStyles'
import { Navbar } from './components'
import history from "./history"
import Chords from './pages/Chords/Chords'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Account from './pages/Account/Account'
import Amplify from 'aws-amplify'
import UserProvider from "./context/UserProvider"
import config from './aws-exports'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
Amplify.configure(config)

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height:100vh;
`

function App() {

  return (
    <Router history={history}>
      <AppContainer>
        <Router>
          <GlobalStyles />
          <Navbar />

          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/chords" component={Chords}></Route>
            <UserProvider>
              <Route path="/account" component={Account}></Route>
              <Route path="/sign-up" component={Signup}></Route>
            </UserProvider>
          </Switch>
        </Router>
      </AppContainer>
    </Router>
  );
}

export default App;
