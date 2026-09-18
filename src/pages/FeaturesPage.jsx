import FeatureCard from '../components/FeatureCard/FeatureCard.jsx';
import {
  faBolt,
  faLayerGroup,
  faWandMagicSparkles,
  faShieldHalved,
  faPenToSquare,
  faGift,
} from '@fortawesome/free-solid-svg-icons';

const FEATURES = [
  {
    icon: faBolt,
    title: 'One-Click Optimization',
    text: 'Clean and format your code instantly with a single click. No manual steps required.',
    color: '#f59e0b',
  },
  {
    icon: faLayerGroup,
    title: 'Multi-Language Support',
    text: 'HTML, CSS, JavaScript, PHP, WordPress, Shopify Liquid & more languages supported.',
    color: '#3b82f6',
  },
  {
    icon: faWandMagicSparkles,
    title: 'Smart Formatting',
    text: 'Remove unwanted spaces, line breaks and fix structure while preserving your code logic.',
    color: '#8b5cf6',
  },
  {
    icon: faShieldHalved,
    title: 'Safe & Secure',
    text: 'Runs entirely in your browser. Your code never leaves your device — guaranteed.',
    color: '#10b981',
  },
  {
    icon: faPenToSquare,
    title: 'Editable Output',
    text: 'Modify the optimized code directly in the output editor before copying or downloading.',
    color: '#06b6d4',
  },
  {
    icon: faGift,
    title: 'Free to Use',
    text: 'No sign-up, no account required. Start using CodeClean immediately, completely free.',
    color: '#f43f5e',
  },
];

export default function FeaturesPage() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-2">Powerful Features for Cleaner Code</h1>
          <p style={{ color: 'var(--cc-muted)' }}>
            Everything you need to format, clean and optimize your code.
          </p>
        </div>
        <div className="row g-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
