import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <NavLink className="navbar-brand" to="/salespeople/">Salespeople</NavLink>
        <NavLink className="navbar-brand" to="/salespeople/add/">Add a Salesperson</NavLink>
        <NavLink className="navbar-brand" to="/sales/add/">Add a Sale</NavLink>
        <NavLink className="navbar-brand" to="/sales/">Sales</NavLink>
        <NavLink className="navbar-brand" to="/sales/history/">Salesperson History</NavLink>
        <NavLink className="navbar-brand" to="/customers/">Customers</NavLink>
        <NavLink className="navbar-brand" to="/customers/add/">Add a customer</NavLink>
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
