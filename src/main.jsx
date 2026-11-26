import { createRoot } from 'react-dom/client';
import './styles.css';
import './house-scene.js';
import { DCHost } from './DCLogic.jsx';
import Portfolio from './Portfolio.jsx';
import PortfolioView from './PortfolioView.jsx';

createRoot(document.getElementById('dc-root')).render(<DCHost logic={Portfolio} view={PortfolioView} />);
