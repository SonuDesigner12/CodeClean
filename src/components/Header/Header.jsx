import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faMoon, faSun, faRocket } from '@fortawesome/free-solid-svg-icons';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/tools', label: 'Tools' },
  { to: '/features', label: 'Features' },
  { to: '/languages', label: 'Supported Languages' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/faq', label: 'FAQ' },
];

export default function Header({ theme, onToggleTheme }) {
  const location = useLocation();
  const isTool = location.pathname === '/tools';

  return (
    <header className="cc-header sticky-top">
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
          {/* Logo */}
          <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold mb-0" to="/">
            <span className="cc-logo-mark d-inline-flex align-items-center justify-content-center">
              <FontAwesomeIcon icon={faCode} />
            </span>
            CodeClean
          </NavLink>

          {/* Mobile toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#ccNav"
            aria-controls="ccNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Nav links + actions */}
          <div className="collapse navbar-collapse" id="ccNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
              {NAV_ITEMS.map((item) => (
                <li className="nav-item" key={item.to}>
                  <NavLink className="nav-link px-2" to={item.to} end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              {/* Theme toggle */}
              <button
                type="button"
                className="btn btn-light rounded-circle cc-icon-btn d-flex align-items-center justify-content-center"
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
              </button>

              {/* CTA or Avatar */}
              {isTool ? (
                <span
                  className="cc-avatar d-inline-flex align-items-center justify-content-center fw-semibold"
                  aria-label="User avatar"
                >
                  U
                </span>
              ) : (
                <NavLink className="btn cc-btn-dark rounded-pill px-4" to="/tools">
                  Get Started
                  <FontAwesomeIcon icon={faRocket} className="ms-2 d-none d-sm-inline" />
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
