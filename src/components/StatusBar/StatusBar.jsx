const STATUS_CONFIG = {
  idle: { cls: 'text-secondary', icon: '' },
  optimizing: { cls: 'text-primary', icon: '⏳ ' },
  success: { cls: 'text-success', icon: '✓ ' },
  warning: { cls: 'text-warning', icon: '⚠ ' },
  parse_error: { cls: 'text-danger', icon: '✗ ' },
  formatting_error: { cls: 'text-danger', icon: '✗ ' },
  validation_error: { cls: 'text-danger', icon: '✗ ' },
};

export default function StatusBar({ status, message, lines, characters }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.idle;

  return (
    <div
      className="d-flex flex-wrap justify-content-between gap-2"
      style={{ fontSize: '0.78rem' }}
    >
      {message ? (
        <span className={config.cls}>
          {config.icon}
          {message}
        </span>
      ) : (
        <span />
      )}
      {typeof lines === 'number' && (
        <span style={{ color: 'var(--cc-muted)' }}>
          Lines: {lines}&nbsp;&nbsp;Characters: {characters}
        </span>
      )}
    </div>
  );
}
