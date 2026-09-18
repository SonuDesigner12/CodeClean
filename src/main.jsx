import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/app.css';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import OptimizerPage from './pages/OptimizerPage.jsx';
import FeaturesPage from './pages/FeaturesPage.jsx';
import LanguagesPage from './pages/LanguagesPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<OptimizerPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/languages" element={<LanguagesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
