import LanguageCard from '../components/LanguageCard/LanguageCard.jsx';
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faPhp,
  faWordpress,
  faShopify,
} from '@fortawesome/free-brands-svg-icons';
import { faCode, faFileCode } from '@fortawesome/free-solid-svg-icons';

const LANGUAGES = [
  {
    icon: faHtml5,
    name: 'HTML',
    note: 'Full formatter support',
    brand: true,
    color: '#e34f26',
  },
  {
    icon: faCss3Alt,
    name: 'CSS',
    note: 'Full formatter support',
    brand: true,
    color: '#264de4',
  },
  {
    icon: faJs,
    name: 'JavaScript',
    note: 'Full formatter support',
    brand: true,
    color: '#f7df1e',
  },
  {
    icon: faPhp,
    name: 'PHP',
    note: 'Safe mixed-template support',
    brand: true,
    color: '#777bb3',
  },
  {
    icon: faWordpress,
    name: 'WordPress',
    note: 'PHP regions preserved',
    brand: true,
    color: '#21759b',
  },
  {
    icon: faShopify,
    name: 'Shopify Liquid',
    note: 'Liquid tags preserved',
    brand: true,
    color: '#95bf47',
  },
  {
    icon: faCode,
    name: 'JSON',
    note: 'Full formatter support',
    color: '#f59e0b',
  },
  {
    icon: faFileCode,
    name: 'XML',
    note: 'Conservative indent support',
    color: '#3b82f6',
  },
];

export default function LanguagesPage() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-2">Supported Languages</h1>
          <p style={{ color: 'var(--cc-muted)' }}>Works with all major web technologies.</p>
        </div>
        <div className="row g-4">
          {LANGUAGES.map((language) => (
            <LanguageCard key={language.name} {...language} />
          ))}
        </div>
        <p className="text-center mt-5 mb-0" style={{ color: 'var(--cc-muted)' }}>
          More languages coming soon...
        </p>
      </div>
    </section>
  );
}
