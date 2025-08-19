import { Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import SmoothScrollProvider from './components/SmoothScrollProvider'
import Home from './home'
import AboutUs from './aboutus'
import Projects from './projects'
import Members from './members'
import Achievements from './achievement'
import Inventory from './inventory'
import ContactUs from './contactus'


function App() {
  return (
    <SmoothScrollProvider>
      <div className="App">
        <Header />
        <main className="md:ml-0 ml-16 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/members" element={<Members />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/Campaign's" element={<Inventory />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <div className="md:ml-0 ml-16 transition-all duration-300">
          <Footer />
        </div>
      </div>
    </SmoothScrollProvider>
  )
}

export default App
