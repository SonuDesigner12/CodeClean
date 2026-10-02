import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/languages', label: 'Languages' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="cc-footer py-4 mt-auto">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          {/* Brand */}
          <div className="d-flex align-items-center gap-2 fw-semibold">
            <span
              className="d-inline-flex align-items-center justify-content-center"
              style={{
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '0.5rem',
                background: 'var(--cc-accent)',
                color: '#fff',
                fontSize: '0.8rem',
              }}
            >
              <FontAwesomeIcon icon={faCode} />
            </span>
            CodeClean
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-decoration-none"
                  style={{ color: 'var(--cc-muted)', fontSize: '0.85rem' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Privacy note */}
          {/* <p  className="small mb-0 d-flex align-items-center gap-1" style={{ color: 'var(--cc-muted)' }}   >
            <FontAwesomeIcon icon={faShieldHalved} className="me-1" />
            Runs locally in your browser
          </p> */}
        </div>

        <hr style={{ borderColor: 'var(--cc-line)', margin: '1rem 0 0' }} />
        <p className="text-center small mb-0 mt-3" style={{ color: 'var(--cc-muted)' }}>
          © {new Date().getFullYear()} CodeClean — Clean Code. Better Projects.
        </p>
      </div>
    </footer>
  );
}
