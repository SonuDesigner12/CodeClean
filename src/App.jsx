import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import { useTheme } from './hooks/useTheme.js';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="cc-app d-flex flex-column min-vh-100">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
