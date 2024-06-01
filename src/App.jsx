import './App.css'
import data from "./assets/eve.json"
import { createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'


export const AlertContext = createContext()

function App() {
  return (
    <BrowserRouter>
      <AlertContext.Provider value={data}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/flowid' element={<Search/>}/>
        </Routes>
      </AlertContext.Provider>
    </BrowserRouter >
  )
}

export default App
