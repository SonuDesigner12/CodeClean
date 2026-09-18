import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LanguageCard({ icon, name, note, brand, color }) {
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <article className="cc-card h-100 p-4 text-center">
        <div
          className="cc-lang-icon mx-auto mb-3"
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '1rem',
            fontSize: brand ? '1.8rem' : '1.4rem',
            background: color ? `${color}18` : 'var(--cc-line)',
            color: color || 'var(--cc-ink)',
          }}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
        <h3 className="h6 fw-bold mb-1">{name}</h3>
        <p className="small mb-0" style={{ color: 'var(--cc-muted)', fontSize: '0.78rem' }}>
          {note}
        </p>
      </article>
    </div>
  );
}
