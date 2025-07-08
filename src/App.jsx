import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Compara from './components/Compara'

const App = () => {
  return (
    <div className="h-[100svh] bg-bk-1 text-wt-1 font-sans flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>

      <main className="flex-1 overflow-y-auto mt-[64px] mb-[64px] px-4">
        <Compara />
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App
