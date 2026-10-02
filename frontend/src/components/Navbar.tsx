import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Learn', to: '/learn' },
  { label: 'Create', to: '/create' },
  { label: 'Verify', to: '/verify' },
  { label: 'Quantum Lab', to: '/lab' },
  { label: 'Tampering Demo', to: '/demo' },
  { label: 'About', to: '/about' }
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/90 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3" aria-label="QSF home">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-sm font-semibold text-cyan-300">
            QSF
          </div>
          <div className="leading-none">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Quantum Signature</div>
            <div className="mt-1 text-base font-semibold text-white">Framework</div>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-6 min-[900px]:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden min-[900px]:block">
          <NavLink
            to="/create"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500"
          >
            Create Signature
          </NavLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100 min-[900px]:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 min-[900px]:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? 'bg-cyan-400/10 text-cyan-300' : 'text-slate-300 hover:bg-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/create"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white"
            >
              Create Signature
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
