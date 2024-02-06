import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AddSalesperson from './AddSalesperson';
import ListSalespeople from './ListSalespeople';
import AddCustomer from './AddCustomer';
import ListCustomers from './ListCustomers';
import AddSale from './AddSale';
import ListSales from './ListSales';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople/" element={<ListSalespeople />} />
          <Route path="salespeople/add/" element={<AddSalesperson />} />
          <Route path="sales/add/" element={<AddSale />} />
          <Route path="sales/" element={<ListSales />} />
          <Route path="customers/" element={<ListCustomers />} />
          <Route path="customers/add/" element={<AddCustomer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
