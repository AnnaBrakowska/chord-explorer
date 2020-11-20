import React from 'react'
import styled from 'styled-components'
import GlobalStyles from './globalStyles'
import { Navbar } from './components'
import Chords from './pages/Chords/Chords'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height:100vh;
`

function App() {
  return (
    <AppContainer>
      <Router>
        <GlobalStyles />
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/chords" component={Chords}></Route>
          <Route path="/sign-up" component={Signup}></Route>
        </Switch>
      </Router>
    </AppContainer>
  );
}

export default App;
