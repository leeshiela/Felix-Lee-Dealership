import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AddSalesperson from './AddSalesperson';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople/add/" element={<AddSalesperson />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
