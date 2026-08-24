import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/submit', label: 'Submit' }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-void/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-frost-300 to-glacier text-void font-display font-bold">
            M
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-frost-50">
            Mine<span className="frost-text">Seek</span> AI
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/8 text-frost-100' : 'text-white/60 hover:text-white/90'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-xs font-medium ${
                  isActive ? 'bg-white/8 text-frost-100' : 'text-white/50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
