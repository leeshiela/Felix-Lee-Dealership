import felix_lee_name from "./static/img/felix_lee_name.png";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";

function MainPage() {
  const [autos, setAutos] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [filterManufacturer, setFilterManufacturer] = useState(0);
  const [filterManufacturerColor, setFilterManufacturerColor] = useState("");
  const [filterYear, setFilterYear] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const [details, setDetails] = useState({
                                    model: 'Rav4',
                                    vin: 'JT4VN13G6S5150447',
                                    pictures: ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"],
                                    manufacturer: 'Toyota',
                                    year: 2023,
                                    color: 'Black',
                                    });

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

  function populateModal(car) {
    setDetails({model: car.model.name,
                vin: car.vin,
                pictures: [car.model.picture_url],
                manufacturer: car.model.manufacturer.name,
                year: car.year,
                color: car.color});
    setOpenDetail(true);
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="px-4 py-5 my-5 text-center">
      {openDetail ?
      <div>
        <div className="modal fade show" id="exampleModalLive" tabIndex="-1" aria-labelledby="exampleModalLiveLabel" style={{display: "block"}} aria-modal="true" role="dialog">
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLiveLabel">{`${details.manufacturer} ${details.model} - ${details.year}`}</h1>
                <button type="button" className="btn-close" onClick={() => setOpenDetail(false)} data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div id="detailPictures" className="carousel slide">
                <div className="carousel-inner">
                {details.pictures.map((pic, i) => { return(
                  <div className={i === 0 ? "carousel-item active": "carousel-item"} key={i}>
                    <img src={pic} className="d-block w-100" alt="..."/>
                  </div>)})
                }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="modal-body mx-2">
                <h5 className="text-start mt-2">Details</h5>
                <div className="card bg-light mx-5 px-4">
                  <div className="card-body">
                    <table className="table table-borderless table-striped-columns table-sm mb-1">
                      <tbody className="px-4">
                        <tr>
                          <td className="text-end"><b>Year</b></td><td className="text-start">{details.year}</td>
                          <td className="text-end"><b>Make</b></td><td className="text-start">{details.manufacturer}</td>
                        </tr>
                        <tr>
                          <td className="text-end"><b>Model</b></td><td className="text-start">{details.model}</td>
                          <td className="text-end"><b>VIN</b></td><td className="text-start">{details.vin}</td>
                        </tr>
                        <tr>
                          <td className="text-end"><b>Color</b></td><td className="text-start">{details.color}</td>
                          <td className="text-end"><b>Body</b></td><td className="text-start">Sedan</td>
                        </tr>
                        <tr>
                          <td className="text-end"><b>Mileage</b></td><td className="text-start">100,000 Miles</td>
                          <td className="text-end"><b>Condition</b></td><td className="text-start">Mint</td>
                        </tr>
                        <tr>
                          <td className="text-end"><b>Transmission</b></td><td className="text-start">Automatic</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <h5 className="text-start mt-4">Description</h5>
                <p className="text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                A diam sollicitudin tempor id eu nisl nunc mi. Curabitur vitae nunc sed velit dignissim. Diam ut venenatis tellus in metus
                vulputate. Platea dictumst quisque sagittis purus sit amet volutpat.</p>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setOpenDetail(false)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Confirm Availability</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </div> : <div></div>}
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
                return (
                  <div key={auto.id} className={ autos.length > 3? "col-4": "col"}>
                    <button className="bare-button my-3" onClick={() => populateModal(auto)}>
                    <div className="card shadow">
                      <img src={auto.model.picture_url} className="card-img-top" alt={auto.color} />
                        <div className="card-body">
                          <h5 className="card-title">{auto.model.manufacturer.name} {auto.model.name}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                            {auto.vin}
                          </h6>
                        </div>
                        <div className="card-footer">
                          <p>Color: {auto.color}</p>
                          <p>Year: {auto.year}</p>
                        </div>
                    </div>
                    </button>
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
