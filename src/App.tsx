import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageNavigator from './components/PageNavigator'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Inteligencia from './pages/Inteligencia'
import Metodo from './pages/Metodo'
import Firma from './pages/Firma'
import Contacto from './pages/Contacto'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop/>
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-amber focus:text-void focus:px-4 focus:py-2 focus:text-[12px]">
        Saltar al contenido
      </a>
      <Navbar/>
      <PageNavigator/>
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/servicios" element={<Servicios/>}/>
          <Route path="/inteligencia" element={<Inteligencia/>}/>
          <Route path="/metodo" element={<Metodo/>}/>
          <Route path="/firma" element={<Firma/>}/>
          <Route path="/contacto" element={<Contacto/>}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}
