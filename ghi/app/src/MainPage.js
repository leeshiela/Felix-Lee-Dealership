import felix_lee_name from "./static/img/felix_lee_name.png";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import Carousel from "./Carousel";

function MainPage() {
  const [autos, setAutos] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [filterManufacturer, setFilterManufacturer] = useState(0);
  const [filterManufacturerColor, setFilterManufacturerColor] = useState("");
  const [filterYear, setFilterYear] = useState(0);

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
    if (filterManufacturer === 0) {
      return true;
    } else {
      return auto.model.manufacturer.id === filterManufacturer;
    }
  }

  const handleManufacturerColor = (event) => {
    const value = event.target.value;
    setFilterManufacturerColor(value);
  }

  function filterColor(auto) {
    if (filterManufacturerColor === "") {
      return true;
    } else {
      return auto.color === filterManufacturerColor;
    }
  }

  const handleYear = (event) => {
    const value = event.target.value;
    setFilterYear(Number(value));
  }

  function filterByYear(auto) {
    if (filterYear === 0) {
      return true;
    } else {
      return auto.year === filterYear;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const imageUrls = ["https://www.freewebheaders.com/wp-content/gallery/cars/toyota-gt86-red-car-on-road-website-header.jpg", "https://www.freewebheaders.com/wp-content/gallery/cars/tesla-roadster-red-super-sports-car-website-header.jpg", "https://www.freewebheaders.com/wp-content/gallery/cars/blue-bmw-alpina-b6-xdrive-gran-coupe-car-web-header.jpg"]

  const manufacturerImages = manufacturers.length === 0 ? imageUrls : manufacturers.map((manufacturer) => manufacturer.picture_url);

  return (
    <>
    <Carousel props={manufacturerImages} />
    <div className="px-4 py-5 my-5 text-center">
      <img id="dealership-name" src={felix_lee_name} alt="dealership name"/>
      <h2 className="display-sm fw-bold">Car Showroom</h2>
      <div id="user">
        <div>
          <NavLink className="btn btn-primary" to="/appointments/create" role="button">I need to service my car</NavLink>
        </div>
      </div>
      <div id="filter-selections">
        <div>
          <p className="lead mb-4">
            Filter automobiles by:
          </p>
        </div>
        <div>
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
        <div>
            <select value={filterManufacturerColor} onChange={handleManufacturerColor}>
                <option value={""}>Choose a color</option>
                      {autos.reduce((newArry, auto) => {
                        if (!newArry.includes(auto.color)) {
                          newArry.push(auto.color);
                        }
                          return newArry;
                      }, []).map((color, index) => {
                        return (
                          <option key={index} value={color}>{color}</option>
                          );
                        })
                      }
            </select>
        </div>
        <div>
            <select value={filterYear} onChange={handleYear}>
                <option value={""}>Choose a year</option>
                      {autos.reduce((newArry, auto) => {
                        if (!newArry.includes(auto.year)) {
                          newArry.push(auto.year);
                        }
                          return newArry;
                      }, []).map((year, index) => {
                        return (
                          <option key={index} value={year}>{year}</option>
                          );
                        })
                      }
            </select>
        </div>
      </div>

      <div className="container">
        <div className="row">
            { autos.filter((auto) => filteredManufacturer(auto) && filterColor(auto) && filterByYear(auto)).map((auto) => {
              {if (autos.length > 3) {
                return (
                  <div key={auto.id} className="col-4">
                    <div className="card mb-3 mt-3 shadow">
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
                )
              } else {
                return (
                <div key={auto.id} className="col">
                  <div className="card mb-3 mt-3 shadow">
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
              }};
            })
          }
        </div>
      </div>
      </div>
      </>
  );
}

export default MainPage;
