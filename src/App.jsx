import React from 'react'
import Homepage from './Pages/Homepage'
import Generatorpages from './Pages/Generatorpages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './Pages/ThemeContext'  

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/generator' element={<Generatorpages />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
