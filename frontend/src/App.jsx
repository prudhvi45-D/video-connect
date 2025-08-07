import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing.jsx'
import Authentication from './pages/authentication.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import Videomeet from './pages/videomeet.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
           <Route path="/auth" element={<Authentication />} />
           <Route path="/:url" element={<Videomeet />} />
        </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
