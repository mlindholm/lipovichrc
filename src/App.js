import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { BigTranscript, PushToTalkButton } from '@speechly/react-ui'
import { SpeechProvider } from '@speechly/react-client'
import ScrollToTop from './utils/ScrollToTop'
import Registration from './views/Registration'
import Competition from './views/Competition'
import Finish from './views/Finish'
import InstallPWA from './pwa/InstallPWA'
import './App.css'

function App() {
  return (
    <div class="App">
      <SpeechProvider appId="a16e8861-7891-4af4-99a8-c7dd2b674eaa" language="en-US">
        <BrowserRouter>
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <Redirect to="/register" />
            </Route>
            <Route path="/register">
              <Registration />
              <InstallPWA />
            </Route>
            <Route path="/compete">
              <BigTranscript highlightColor="#f4882a" backgroundColor="#17191c" formatText={false} />
              <Competition />
              <PushToTalkButton placement="bottom" size="72px" gradientStops={['#f6b035', '#f4882a']} fontSize="1rem" backgroundColor="#17191c" />
            </Route>
            <Route path="/finish">
              <Finish />
            </Route>
            <Route path="*">
              <Redirect to="/compete" />
            </Route>
          </Switch>
        </BrowserRouter>
      </SpeechProvider>
    </div>
  )
}

export default App
