import { NavLink } from 'react-router-dom';
import felix_lee_black from "./static/img/felix_lee_black.png";

function Nav() {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-black" >
        <div className="container-fluid">
          <div className="navbar-brand">
            <NavLink  to="/"><img id="logo" src={felix_lee_black} alt="logo link"/></NavLink>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link drop-down-toggle fs-3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Inventory
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><NavLink className="dropdown-item" to="/models/">Models</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/models/create/">Create a Model</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/manufacturers/">Manufacturers</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/manufacturers/create/">Create a Manufacturer</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/automobiles/">Automobiles</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/automobiles/create/">Create an Automobile</NavLink></li>
                  </ul>
                </li>
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link drop-down-toggle fs-3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Sales
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><NavLink className="dropdown-item" to="/salespeople/">Salespeople</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/customers/">Customers</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/sales/history/">Sales History</NavLink></li>
                  </ul>
                </li>
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link drop-down-toggle fs-3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Service
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><NavLink className="dropdown-item" to="/technicians/">Technicians</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/appointments/">Service Appointments</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/appointments/history/">Service History</NavLink></li>
                  </ul>
                </li>
              </ul>
          </div>
        </div>
      </nav>

  )
}

export default Nav;
