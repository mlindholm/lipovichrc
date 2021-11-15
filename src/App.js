import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Registration from './registration/Registration'
import Competition from './competition/Competition'
import Finish from './finish/Finish'
import InstallPWA from './pwa/InstallPWA'
import ScrollToTop from './utils/ScrollToTop'
import { BigTranscript, PushToTalkButton } from '@speechly/react-ui'
import { SpeechProvider } from '@speechly/react-client'
import './App.css'

function App() {
  return (
    <SpeechProvider appId="a16e8861-7891-4af4-99a8-c7dd2b674eaa" language="en-US">
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route path="/register">
            <Registration />
            <InstallPWA />
          </Route>
          <Route path="/compete">
            <BigTranscript highlightColor="#f4882a" backgroundColor="#17191c" />
            <Competition />
            <PushToTalkButton placement="bottom" size="72px" gradientStops={['#f6b035', '#f4882a']} fontSize="1rem" backgroundColor="#17191c" />
          </Route>
          <Route path="/finish">
            <Finish />
          </Route>
          <Route exact path="/">
            <Redirect to="/register" />
          </Route>
        </Switch>
      </BrowserRouter>
    </SpeechProvider>
  )
}

export default App
