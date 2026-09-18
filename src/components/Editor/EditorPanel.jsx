import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CodeEditor from './CodeEditor.jsx';

const STATUS_CLASS = {
  idle: 'text-secondary',
  optimizing: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  parse_error: 'text-danger',
  formatting_error: 'text-danger',
  validation_error: 'text-danger',
};

export default function EditorPanel({
  title,
  subtitle,
  actionLabel,
  actionIcon,
  onAction,
  extraActions,
  value,
  onChange,
  languageId,
  status,
  lines,
  characters,
  ariaLabel,
}) {
  return (
    <section className="cc-card p-3 p-md-4 h-100 d-flex flex-column">
      {/* Panel header */}
      <div className="d-flex flex-wrap align-items-start justify-content-between gap-2 mb-3">
        <div>
          <h2 className="h6 fw-bold mb-1">{title}</h2>
          <p className="small mb-0" style={{ color: 'var(--cc-muted)', fontSize: '0.78rem' }}>
            {subtitle}
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {extraActions}
          {onAction ? (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary rounded-pill"
              onClick={onAction}
            >
              <FontAwesomeIcon icon={actionIcon} className="me-1" />
              {actionLabel}
            </button>
          ) : null}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-grow-1">
        <CodeEditor value={value} onChange={onChange} languageId={languageId} ariaLabel={ariaLabel} />
      </div>

      {/* Footer: status + line/char count */}
      <div
        className={`d-flex flex-wrap justify-content-between gap-2 mt-2`}
        style={{ fontSize: '0.75rem' }}
      >
        <span className={STATUS_CLASS[status] || 'text-secondary'} />
        {typeof lines === 'number' ? (
          <span style={{ color: 'var(--cc-muted)' }}>
            Lines: {lines}&nbsp;&nbsp;Characters: {characters}
          </span>
        ) : null}
      </div>
    </section>
  );
}
