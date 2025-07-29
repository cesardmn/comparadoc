import { useState } from 'react'
import logo from '../assets/img/htd.svg'

const Navbar = ({ onHomeClick }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-bk-2 border-b border-bk-3 text-wt-1">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo - clicável para voltar à Home */}
        <div
          className="flex items-center gap-2 hover:text-or-1 transition cursor-pointer"
          onClick={onHomeClick}
          aria-label="Voltar para a página inicial"
        >
          <div className="h-10 w-auto overflow-hidden flex items-center justify-center text-bk-1 font-bold text-lg select-none">
            <img
              src={logo}
              alt="Logo do AutoFlux"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Links desktop */}
        <ul className="hidden md:flex gap-6 text-gr-2 font-medium">
          <li>
            <button
              onClick={onHomeClick}
              className="hover:text-or-1 transition-colors duration-150"
            >
              Início
            </button>
          </li>
          <li>
            <a
              href="https://www.autoflux.app.br/maladireta"
              className="hover:text-or-1 transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
            >
              mala direta
            </a>
          </li>
          <li>
            <a
              href="https://www.autoflux.app.br/smt"
              className="hover:text-or-1 transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
            >
              smt
            </a>
          </li>
          <li>
            <a
              href="https://www.vfipe.com.br/"
              className="hover:text-or-1 transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
            >
              vfipe
            </a>
          </li>
        </ul>

        {/* Botão mobile */}
        <button
          onClick={() => setMenuOpen(!open)}
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-or-2 transition-transform duration-150"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6 text-wt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`md:hidden px-4 pt-0 pb-4 transition-all duration-300 ease-in-out ${
          menuOpen
            ? 'opacity-100 max-h-96'
            : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <ul className="flex flex-col gap-2 text-gr-2 font-medium">
          <li>
            <button
              onClick={() => {
                onHomeClick()
                setMenuOpen(false)
              }}
              className="hover:text-or-1 transition-colors duration-150 w-full text-left py-2"
            >
              Início
            </button>
          </li>
          <li>
            <a
              href="https://www.autoflux.app.br/maladireta"
              className="hover:text-or-1 transition-colors duration-150 block py-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              mala direta
            </a>
          </li>
          <li>
            <a
              href="https://www.autoflux.app.br/smt"
              className="hover:text-or-1 transition-colors duration-150 block py-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              smt
            </a>
          </li>
          <li>
            <a
              href="https://www.vfipe.com.br/"
              className="hover:text-or-1 transition-colors duration-150 block py-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              vfipe
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
