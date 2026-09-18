import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PricingCard from '../components/PricingCard/PricingCard.jsx';

export default function PricingPage() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Simple & Transparent Pricing</h1>
          <p className="text-secondary">Start for free. Upgrade when you need more.</p>
        </div>
        <div className="row g-4 justify-content-center">
          <PricingCard
            name="Free"
            price="$0"
            description="Perfect for personal use."
            features={[
              'Basic code optimization',
              'All major languages',
              'Copy & download',
              'No sign-up required',
            ]}
            cta="Use for Free"
            onAction={() => navigate('/tools')}
          />
          <PricingCard
            name="Pro"
            price="$5"
            period="/ month"
            popular
            description="For professionals and teams."
            features={[
              'Advanced optimization',
              'Priority support',
              'Batch file processing',
              'Custom formatting rules',
              'Future AI features',
            ]}
            cta="Get Pro"
            onAction={() =>
              setNotice(
                'Pro billing is not included in this MVP. The optimizer remains free to use in your browser.',
              )
            }
          />
        </div>
        {notice ? <p className="text-center text-secondary mt-4">{notice}</p> : null}
      </div>
    </section>
  );
}
