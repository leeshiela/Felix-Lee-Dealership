import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AddSalesperson from './AddSalesperson';
import ListSalespeople from './ListSalespeople';
import AddCustomer from './AddCustomer';
import ListCustomers from './ListCustomers';
import AddSale from './AddSale';
import ListSales from './ListSales';
import SalesHistory from './SalespersonHistory';
import TechList from './TechList';
import TechForm from './TechForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople/" element={<ListSalespeople />} />
          <Route path="salespeople/create/" element={<AddSalesperson />} />
          <Route path="sales/create/" element={<AddSale />} />
          <Route path="sales/" element={<ListSales />} />
          <Route path="sales/history/" element={<SalesHistory />} />
          <Route path="customers/" element={<ListCustomers />} />
          <Route path="customers/create/" element={<AddCustomer />} />
          <Route path="technicians" >
            <Route path="" element={<TechList />} />
            <Route path="create" element={<TechForm />} />
          </Route>
          <Route path="appointments" >
            <Route path="" element={<AppointmentList />} />
            <Route path="create" element={<AppointmentForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
