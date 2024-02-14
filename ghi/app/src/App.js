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
import ListManufacturers from './ListManufacturers';
import AddManufacturer from './AddManufacturer';
import AddVehicleModel from './AddVehicleModel';
import ListTechnicians from './ListTechnicians';
import AddTechnician from './AddTechnician';
import ListAppointments from './ListAppointments';
import AddAppointment from './AddAppointment';
import ServiceHistory from './ServiceHistory';
import ListAutomobiles from './ListAutomobiles';
import ListModels from './ListModels';
import AddAutoMobile from './AddAutoMobile';
import Footer from './Footer';
import Carousel from './Carousel';

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
          <Nav />
          <div className="container">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="manufacturers" >
                <Route path="" element={<ListManufacturers />} />
                <Route path="create" element={<AddManufacturer />} />
              </Route>
              <Route path="models" >
                <Route path="" element={<ListModels />} />
                <Route path="create" element={<AddVehicleModel />} />
              </Route>
              <Route path="automobiles" >
                <Route path="" element={<ListAutomobiles />} />
                <Route path="create" element={<AddAutoMobile />} />
              </Route>
              <Route path="salespeople" >
                <Route path="" element={<ListSalespeople />} />
                <Route path="create" element={<AddSalesperson />} />
              </Route>
              <Route path="sales" >
                <Route path="" element={<ListSales />} />
                <Route path="create" element={<AddSale />} />
                <Route path="history" element={<SalesHistory />} />
              </Route>
              <Route path="customers" >
                <Route path="" element={<ListCustomers />} />
                <Route path="create" element={<AddCustomer />} />
              </Route>
              <Route path="technicians" >
                <Route path="" element={<ListTechnicians />} />
                <Route path="create" element={<AddTechnician />} />
              </Route>
              <Route path="appointments" >
                <Route path="" element={<ListAppointments />} />
                <Route path="create" element={<AddAppointment />} />
                <Route path="history" element={<ServiceHistory />} />
              </Route>
            </Routes>
          </div>
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
