import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback('Please fill in your name, email, and message.');
      return;
    }
    setFeedback(
      'This contact form stays on your device. Email  support@codeclean.dev  directly — nothing is sent to a server.',
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="cc-card p-4 p-lg-5">
          <div className="row g-5">
            <div className="col-12 col-lg-7">
              <h1 className="fw-bold">Get in Touch</h1>
              <p className="text-secondary">
                Have questions, suggestions or feedback? We’d love to hear from you.
              </p>
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={updateField}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="email">
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={updateField}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Type your message..."
                      value={form.message}
                      onChange={updateField}
                    />
                  </div>
                </div>
                <button type="submit" className="btn cc-btn-dark rounded-pill px-4 py-2 mt-4">
                  Send Message
                </button>
              </form>
              {feedback ? <p className="small text-secondary mt-3 mb-0">{feedback}</p> : null}
            </div>
            <div className="col-12 col-lg-5">
              <ul className="list-unstyled d-grid gap-4">
                <li className="d-flex gap-3">
                  <span className="cc-contact-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <div>
                    <strong>Email</strong>
                    <div className="text-secondary">support@codeclean.dev</div>
                  </div>
                </li>
                <li className="d-flex gap-3">
                  <span className="cc-contact-icon">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  <div>
                    <strong>Location</strong>
                    <div className="text-secondary">Remote / Global</div>
                  </div>
                </li>
                <li className="d-flex gap-3">
                  <span className="cc-contact-icon">
                    <FontAwesomeIcon icon={faGithub} />
                  </span>
                  <div>
                    <strong>Follow Us</strong>
                    <div className="d-flex gap-3 mt-2 fs-5">
                      <a href="https://github.com" className="text-dark" aria-label="GitHub">
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                      <a href="https://x.com" className="text-dark" aria-label="X">
                        <FontAwesomeIcon icon={faXTwitter} />
                      </a>
                      <a href="https://youtube.com" className="text-dark" aria-label="YouTube">
                        <FontAwesomeIcon icon={faYoutube} />
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
