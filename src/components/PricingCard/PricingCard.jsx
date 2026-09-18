import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  popular,
  onAction,
}) {
  return (
    <div className="col-12 col-lg-5">
      <article
        className="cc-card h-100 p-4 p-lg-5"
        style={popular ? { border: '2px solid var(--cc-accent)' } : {}}
      >
        {popular ? <span className="cc-popular-badge">Most Popular</span> : null}

        <div className="mb-2">
          <span
            className="badge rounded-pill fw-normal"
            style={{
              background: popular ? 'var(--cc-accent)' : 'var(--cc-line)',
              color: popular ? '#fff' : 'var(--cc-muted)',
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem',
            }}
          >
            {name}
          </span>
        </div>

        <p
          className="fw-bold mb-0"
          style={{ fontSize: '2.5rem', lineHeight: 1.1, marginTop: '0.5rem' }}
        >
          {price}
          {period ? (
            <span className="fs-6 fw-normal" style={{ color: 'var(--cc-muted)' }}>
              {' '}
              {period}
            </span>
          ) : null}
        </p>

        <p className="small mb-4 mt-1" style={{ color: 'var(--cc-muted)' }}>
          {description}
        </p>

        <ul className="list-unstyled d-grid gap-2 mb-4" style={{ fontSize: '0.9rem' }}>
          {features.map((feature) => (
            <li key={feature} className="d-flex align-items-start gap-2">
              <FontAwesomeIcon
                icon={faCheck}
                className="mt-1 flex-shrink-0"
                style={{ color: popular ? 'var(--cc-accent)' : 'var(--cc-success)' }}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="btn cc-btn-dark rounded-pill w-100 py-2 fw-semibold"
          onClick={onAction}
        >
          {cta}
        </button>
      </article>
    </div>
  );
}
