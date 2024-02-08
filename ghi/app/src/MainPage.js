import felix_lee_name from "./static/img/felix_lee_name.png";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";

function MainPage() {
  const [autos, setAutos] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [filterManufacturer, setFilterManufacturer] = useState(0);

  const fetchData = async () => {
    const manufacturersUrl = "http://localhost:8100/api/manufacturers/";
    const autoUrl = "http://localhost:8100/api/automobiles/";
    try {
      const manufacturersResponse = await fetch(manufacturersUrl);
      const response = await fetch(autoUrl);

      if (response.ok && manufacturersResponse.ok) {
        const { manufacturers } = await manufacturersResponse.json();
        setManufacturers(manufacturers);

        const data = await response.json();

        const detailResponse = data.autos.map(async auto => {
          const response = await fetch(`http://localhost:8100/api/automobiles/${auto.vin}/`);
          return await response.json();
        })
        const autoDetails = await Promise.all(detailResponse);
        setAutos(autoDetails);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleManufacturer = (event) => {
    const value = event.target.value;
    setFilterManufacturer(Number(value));
  }

  function filteredManufacturer(auto) {
    if (auto.model.manufacturer.id === 0) {
      return true;
    } else {
      return auto.model.manufacturer.id === filterManufacturer;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="px-4 py-5 my-5 text-center">
      <img id="dealership-name" src={felix_lee_name} alt="dealership name"/>
      <h2 className="display-sm fw-bold">Car Showroom</h2>
      <div id="user">
        <div>
          <NavLink className="btn btn-info" to="/appointments/create" role="button">I need to service my car</NavLink>
        </div>
      </div>
      <div className="filter mx-auto">
        <p className="lead mb-4">
          Filter automobiles by:
        </p>
      </div>
        <p className=" filter lead mb-4">
          Manufacturer
        </p>
      <div className="filter">
          <select value={filterManufacturer} onChange={handleManufacturer}>
              <option value={0}>Choose a Manufacturer</option>
              {manufacturers.map(manufacturer => {
                return (
                  <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                  );
                })
              }
          </select>
      </div>

      <div className="container">
        <div className="row">
          {autos.filter((auto) => filteredManufacturer(auto)).map((auto) => {
            return (
              <div className="col">
                <div key={auto.id} className="card mb-3 mt-3 shadow">
                  <img src={auto.model.picture_url} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{auto.model.manufacturer.name} {auto.model.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {auto.model.vin}
                    </h6>
                  </div>
                  <div className="card-footer">
                    <p>Color: {auto.color}</p>
                    <p>Year: {auto.year}</p>
                  </div>
                </div>
              </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
        }

export default MainPage;
