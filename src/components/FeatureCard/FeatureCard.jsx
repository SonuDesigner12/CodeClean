import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FeatureCard({ icon, title, text, color }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article className="cc-card h-100 p-4">
        <div
          className="cc-card-icon mb-3"
          style={{ background: color ? `${color}20` : undefined, color: color || undefined }}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
        <h3 className="h5 fw-bold mb-2">{title}</h3>
        <p className="small mb-0" style={{ color: 'var(--cc-muted)' }}>
          {text}
        </p>
      </article>
    </div>
  );
}
