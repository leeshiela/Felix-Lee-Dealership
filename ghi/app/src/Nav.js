import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid flex-wrap">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <NavLink className="navbar-brand" to="/manufacturers/">Manufacturers</NavLink>
        <NavLink className="navbar-brand" to="/manufacturers/create/">Create a Manufacturer</NavLink>
        <NavLink className="navbar-brand" to="/models/">Models</NavLink>
        <NavLink className="navbar-brand" to="/models/create/">Create a Model</NavLink>
        <NavLink className="navbar-brand" to="/automobiles/">Automobiles</NavLink>
        <NavLink className="navbar-brand" to="/automobiles/create/">Create an Automobile</NavLink>
        <NavLink className="navbar-brand" to="/salespeople/">Salespeople</NavLink>
        <NavLink className="navbar-brand" to="/salespeople/create/">Add a Salesperson</NavLink>
        <NavLink className="navbar-brand" to="/customers/">Customers</NavLink>
        <NavLink className="navbar-brand" to="/customers/create/">Add a Customer</NavLink>
        <NavLink className="navbar-brand" to="/sales/">Sales</NavLink>
        <NavLink className="navbar-brand" to="/sales/create/">Add a Sale</NavLink>
        <NavLink className="navbar-brand" to="/sales/history/">Sales History</NavLink>
        <NavLink className="navbar-brand" to="/technicians/">Technicians</NavLink>
        <NavLink className="navbar-brand" to="/technicians/create/">Add a Technician</NavLink>
        <NavLink className="navbar-brand" to="/appointments/">Service Appointments</NavLink>
        <NavLink className="navbar-brand" to="/appointments/create/">Create a Service appointment</NavLink>
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
