export default function FAQ({ items }) {
  return (
    <div className="accordion cc-accordion" id="faqAccordion">
      {items.map((item, index) => (
        <div className="accordion-item border-0 mb-3 cc-card overflow-hidden" key={item.question}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button fw-semibold ${index === 0 ? '' : 'collapsed'}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#faq-${index}`}
              aria-expanded={index === 0 ? 'true' : 'false'}
              aria-controls={`faq-${index}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`faq-${index}`}
            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body text-secondary">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
