import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <NavLink className="navbar-brand" to="/manufacturers/">Manufacturers</NavLink>
        <NavLink className="navbar-brand" to="/manufacturers/create/">Add a Manufacturer</NavLink>
        <NavLink className="navbar-brand" to="/salespeople/">Salespeople</NavLink>
        <NavLink className="navbar-brand" to="/salespeople/create/">Add a Salesperson</NavLink>
        <NavLink className="navbar-brand" to="/sales/create/">Add a Sale</NavLink>
        <NavLink className="navbar-brand" to="/sales/">Sales</NavLink>
        <NavLink className="navbar-brand" to="/sales/history/">Salesperson History</NavLink>
        <NavLink className="navbar-brand" to="/customers/">Customers</NavLink>
        <NavLink className="navbar-brand" to="/customers/create/">Add a Customer</NavLink>
        <NavLink className="navbar-brand" to="/technicians/">List Technicians</NavLink>
        <NavLink className="navbar-brand" to="/technicians/create/">Add a Technician</NavLink>
        <NavLink className="navbar-brand" to="/appointments/">List Appointments</NavLink>
        <NavLink className="navbar-brand" to="/appointments/create/">Add an appointment</NavLink>
        <NavLink className="navbar-brand" to="/appointments/history/">Service History</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
