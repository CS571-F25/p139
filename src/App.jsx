import { HashRouter, Routes, Route } from 'react-router'
import './App.css'

import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import Favorites from './components/Favorites'
import PrimaryNav from './components/PrimaryNav'

function App () {
  return (
    <HashRouter>
      <PrimaryNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
