export default function LanguageSelector({ id, value, options, onChange, label = 'Language' }) {
  return (
    <label className="d-flex align-items-center gap-2 mb-0">
      <span className="small text-secondary">{label}</span>
      <select
        id={id}
        className="form-select form-select-sm rounded-pill cc-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
