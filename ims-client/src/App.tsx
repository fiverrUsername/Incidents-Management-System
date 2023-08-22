import { Provider } from 'react-redux'
import React from 'react'

import './App.css'
import LeftDrawer from './components/drawer/Drawer'
import configureStore from './redux/configureStore'

const store = configureStore()

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <LeftDrawer></LeftDrawer>
      </Provider>
    </div>
  )
}

export default App
