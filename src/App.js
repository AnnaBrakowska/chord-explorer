import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import GlobalStyles from './globalStyles'
import { Navbar } from './components'
import Chords from './pages/Chords/Chords'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Account from './pages/Account/Account'
import Amplify, { API } from 'aws-amplify';
import config from '../../aws-exports'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
Amplify.configure(config)

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height:100vh;
`

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // fetch("http://localhost:3000/auth/signin", {
      API.post('chordexplorer', '/authorize/signin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((response) => {
      return response.json()
    }).then(response => {
      if (response.status === 200) {
        setLoggedIn(response.loggedIn)
      }
    })
  }, [])

  return (
    <AppContainer>
      <Router>
        <GlobalStyles />
        <Navbar loggedIn={loggedIn} />

        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/chords" component={Chords}></Route>
          <Route path="/account" component={Account}></Route>
          <Route path="/sign-up" component={Signup}></Route>
        </Switch>
      </Router>
    </AppContainer>
  );
}

export default App;
