import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faShieldHalved,
  faGift,
  faCode,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faPhp,
  faWordpress,
  faShopify,
} from "@fortawesome/free-brands-svg-icons";
import Popup from "../components/Popup/Popup.jsx";

export default function HomePage() {
  return (
    <section className="py-4 py-lg-5">
      <Popup />
      <div className="container">
        {/* ── Hero ──────────────────────────────────────── */}
        <div className="row align-items-center g-5">
          {/* Left: headline + CTA */}
          <div className="col-12 col-lg-6">
            <span className="cc-pill mb-3">
              <FontAwesomeIcon icon={faCode} className="me-2" />
              Clean Code. Better Projects.
            </span>
            <h1 className="display-4 fw-bold lh-1 mb-3">
              Paste Messy Code.
              <br />
              Get Clean,{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #111827 0%, #374151 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Optimized
              </span>{" "}
              Code.
            </h1>
            <p className="lead mb-4" style={{ color: "var(--cc-muted)" }}>
              Remove unwanted spaces, fix formatting, and make your code look
              professional — in one click.
            </p>
            <Link
              to="/tools"
              className="btn cc-btn-dark rounded-pill px-4 py-3 fw-semibold"
            >
              Get Started
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Link>
            <ul
              className="list-unstyled d-grid gap-2 mt-4 small"
              style={{ color: "var(--cc-muted)" }}
            >
              <li>
                <FontAwesomeIcon
                  icon={faCode}
                  className="me-2"
                  style={{ color: "var(--cc-accent)" }}
                />
                Supports HTML, PHP, WordPress, Shopify &amp; more
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="me-2"
                  style={{ color: "var(--cc-accent)" }}
                />
                100% Secure (Runs in your browser)
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faGift}
                  className="me-2"
                  style={{ color: "var(--cc-accent)" }}
                />
                Free to use
              </li>
            </ul>
          </div>

          {/* Right: visual demo */}
          <div className="col-12 col-lg-6">
            <div className="cc-hero-visual p-3 p-md-4">
              {/* macOS window dots */}
              <div className="d-flex align-items-center mb-3">
                <span className="cc-dots">
                  <i />
                  <i />
                  <i />
                </span>
              </div>

              {/* Two code panels + arrow */}
              <div className="row g-3 align-items-center">
                <div className="col">
                  <div className="cc-mini-code">
                    <span className="cc-mini-label">Messy Code</span>
                    <pre>{`<div class="container"
Style=" "
>
<h1
class="fw-bold"
>
  Fixed Container
</h1>
</div>`}</pre>
                  </div>
                </div>

                {/* Arrow */}
                <div className="col-auto d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    className="cc-hero-arrow"
                  />
                </div>

                <div className="col">
                  <div className="cc-mini-code">
                    <span className="cc-mini-label cc-mini-label-out">
                      Optimized Code
                    </span>
                    <pre>{`<div class="container"
  Style=" ">
  <h1 class="fw-bold">
    Fixed Container
  </h1>
</div>`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Trusted by strip ──────────────────────────── */}
        <div className="cc-brand-strip mt-5 pt-4">
          <p
            className="text-center small mb-3"
            style={{ color: "var(--cc-muted)" }}
          >
            Trusted by developers, designers and creators.
          </p>
          <div
            className="d-flex flex-wrap justify-content-center gap-4 pb-2 fw-semibold"
            style={{ color: "var(--cc-muted)" }}
          >
            <span>
              <FontAwesomeIcon
                icon={faHtml5}
                className="me-1"
                style={{ color: "#e34f26" }}
              />
              HTML
            </span>
            <span>
              <FontAwesomeIcon
                icon={faCss3Alt}
                className="me-1"
                style={{ color: "#264de4" }}
              />
              CSS
            </span>
            <span>
              <FontAwesomeIcon
                icon={faJs}
                className="me-1"
                style={{ color: "#f7df1e" }}
              />
              JavaScript
            </span>
            <span>
              <FontAwesomeIcon
                icon={faPhp}
                className="me-1"
                style={{ color: "#777bb3" }}
              />
              PHP
            </span>
            <span>
              <FontAwesomeIcon
                icon={faWordpress}
                className="me-1"
                style={{ color: "#21759b" }}
              />
              WordPress
            </span>
            <span>
              <FontAwesomeIcon
                icon={faShopify}
                className="me-1"
                style={{ color: "#95bf47" }}
              />
              Shopify
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
