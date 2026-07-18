import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import GM from './pages/GM'
import Players from './pages/Players'
import Rules from './pages/Rules'
import Contact from './pages/Contact'
import CharacterSheet from './pages/CharacterSheet'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gm" element={<GM />} />
            <Route path="/players" element={<Players />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/character-sheet" element={<CharacterSheet />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
