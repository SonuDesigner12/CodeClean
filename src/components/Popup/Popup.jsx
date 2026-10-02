import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import bannerImage from "../../assets/CodeClean_ One-Click Code Optimization.png";
import "./Popup.css";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="cc-popup-overlay">
      <section
        className="cc-popup"
        role="dialog"
        aria-modal="true"
        aria-label="CodeClean overview"
      >
        <button
          className="cc-popup-close"
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close popup"
        >
          <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
        </button>
        <img
          className="cc-popup-image"
          src={bannerImage}
          alt="CodeClean overview, supported languages, and optimization features"
        />
      </section>
    </div>
  );
}