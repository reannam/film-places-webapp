import {createRoot} from 'react-dom/client';
import './styles/globals.css';
import App from './components/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Movies from './components/Movies';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<App />} />
      <Route path="/movies" element={<Movies />} />
    </Routes>
  </BrowserRouter>
);