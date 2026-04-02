import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Archive } from './pages/Archive';
import { Experience } from './pages/Experience';
import { Extension } from './pages/Extension';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/extension" element={<Extension />} />
        </Routes>
      </Layout>
    </Router>
  );
}
