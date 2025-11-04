import { HashRouter, Routes, Route } from 'react-router'
import './App.css'

import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'

function App() {

  return <HashRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
  </HashRouter>
}

export default App
