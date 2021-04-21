import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Registration from './registration/Registration'
import Competition from './competition/Competition'
import Finish from './finish/Finish'
import InstallPWA from './pwa/InstallPWA'
import ScrollToTop from './utils/ScrollToTop'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route path="/register">
          <Registration />
          <InstallPWA />
        </Route>
        <Route path="/compete">
          <Competition />
        </Route>
        <Route path="/finish">
          <Finish />
        </Route>
        <Route exact path="/">
          <Redirect to="/register" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
