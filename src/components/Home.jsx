import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import sideBySideImg from '../assets/img/side-by-side.webp'
import stackedImg from '../assets/img/stacked.webp'
import unifiedImg from '../assets/img/unified.webp'

const Home = ({ onStart }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const slides = [
    {
      id: 1,
      title: 'Modo Lado a Lado',
      description: 'Comparação paralela com diferenças alinhadas verticalmente',
      image: sideBySideImg,
      alt: 'Interface mostrando dois documentos comparados lado a lado',
    },
    {
      id: 2,
      title: 'Modo Empilhado',
      description: 'Diferenças exibidas verticalmente em uma única coluna',
      image: stackedImg,
      alt: 'Interface mostrando comparação de documentos em modo empilhado',
    },
    {
      id: 3,
      title: 'Modo Unificado',
      description: 'Alterações mescladas em linha única com marcações',
      image: unifiedImg,
      alt: 'Interface mostrando comparação unificada com marcações coloridas',
    },
  ]

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="min-h-[calc(100svh-128px)] flex items-center px-4 py-12 sm:py-10">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Texto de apresentação */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Compare documentos <span className="text-or-2">com precisão</span>
          </h1>
          <p className="text-lg text-gr-2 max-w-lg">
            Identifique diferenças entre versões de documentos Word de forma
            rápida e intuitiva com nossa ferramenta especializada.
          </p>
          <button
            onClick={onStart}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-or-2 hover:bg-or-1 text-bk-1 font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Começar agora <ArrowRight size={18} />
          </button>
        </div>

        {/* Carrossel com texto sobre imagem */}
        <div
          className="relative group w-full max-w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden rounded-xl border border-bk-3 bg-bk-2 w-full">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
                width: `${slides.length * 100}%`,
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-full h-[400px]"
                  style={{ width: `${100 / slides.length}%` }}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />

                  {/* Texto sobre imagem com fundo blur */}
                  <div className="absolute bottom-0 left-0 right-0 bg-bk-1/95 backdrop-blur-md px-4 py-3 text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-wt-1">
                      {slide.title}
                    </h3>
                    <p className="text-sm sm:text-base text-wt-2 mt-1">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-bk-2/90 hover:bg-bk-3 text-wt-1 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
            aria-label="Slide anterior"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-bk-2/90 hover:bg-bk-3 text-wt-1 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
            aria-label="Próximo slide"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-or-2 w-4' : 'bg-gr-2'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
