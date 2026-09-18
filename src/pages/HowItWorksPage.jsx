import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste, faBolt, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    icon: faPaste,
    number: 1,
    title: 'Paste Your Code',
    text: 'Paste or type your messy code in the input editor. Supports HTML, CSS, JavaScript, PHP, WordPress and Shopify Liquid.',
    color: '#3b82f6',
  },
  {
    icon: faBolt,
    number: 2,
    title: 'Click Optimize',
    text: 'Hit the Optimize Code button and let our tool do the magic — language detection, formatting and validation all happen automatically.',
    color: '#f59e0b',
  },
  {
    icon: faCopy,
    number: 3,
    title: 'Copy & Use',
    text: 'Get clean, professionally formatted code and copy it instantly, or download it as a file. The output editor is also fully editable.',
    color: '#10b981',
  },
];

export default function HowItWorksPage() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="cc-card p-4 p-lg-5">
          <div className="mb-5">
            <h1 className="fw-bold mb-2">How It Works</h1>
            <p style={{ color: 'var(--cc-muted)' }}>Clean code in just 3 simple steps.</p>
          </div>

          <div className="row g-4 g-lg-5">
            {STEPS.map((step) => (
              <div className="col-12 col-md-4" key={step.title}>
                {/* Step number */}
                <div
                  className="cc-step-number mb-3"
                  style={{ background: step.color }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="cc-step-icon mb-3"
                  style={{
                    background: `${step.color}18`,
                    color: step.color,
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.9rem',
                    fontSize: '1.2rem',
                  }}
                >
                  <FontAwesomeIcon icon={step.icon} />
                </div>

                <h2 className="h5 fw-bold mb-2">{step.title}</h2>
                <p className="small mb-0" style={{ color: 'var(--cc-muted)' }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 border-top" style={{ borderColor: 'var(--cc-line) !important' }}>
            <p style={{ color: 'var(--cc-muted)' }} className="mb-3 small">
              Ready to try it? Paste your first code snippet and click Optimize Code.
            </p>
            <Link to="/tools" className="btn cc-btn-dark rounded-pill px-4 py-2">
              Open Code Optimizer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
