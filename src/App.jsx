// src/App.jsx
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Compara from './components/Compara'
import Home from './components/Home'

const App = () => {
  const [showHome, setShowHome] = useState(true)

  return (
    <div className="h-[100svh] bg-bk-1 text-wt-1 font-sans flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar onHomeClick={() => setShowHome(true)} />
      </div>

      <main className="flex-1 overflow-y-auto mt-[64px] mb-[64px] px-4">
        {showHome ? <Home onStart={() => setShowHome(false)} /> : <Compara />}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App
