import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { AdminPanel } from './components/AdminPanel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomeSection />}></Route>
          <Route path='/adminpanel' element={<AdminPanel />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
