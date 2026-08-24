import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Details from './pages/Details.jsx';
import Favorites from './pages/Favorites.jsx';
import Submit from './pages/Submit.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-void text-frost-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/seed/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/submit" element={<Submit />} />
        <Route
          path="*"
          element={
            <div className="flex min-h-[60vh] items-center justify-center text-white/50">Page not found.</div>
          }
        />
      </Routes>
    </div>
  );
}
