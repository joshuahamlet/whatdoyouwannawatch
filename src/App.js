import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import SwipeCard from './Components/SwipeCard'
import Landing from './Components/Landing'
import Header from './Components/Header'
import Matches from './Components/Matches'
import './App.css'

function App() {

  const location = useLocation()

  return (
    <div className="App">
        <Header/>
        <Switch location={location} key={location.key}>
          <Route path='/' exact component={Landing} />
          <Route path='/startswiping' component={SwipeCard}/>
          <Route path='/matches' component={Matches}/>
        </Switch>
    </div>
  )
}

export default App;
