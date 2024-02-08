import felix_lee_name from "./static/img/felix_lee_name.png";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";

function CarColumn(props) {
  return (
    <div className="col">
      {props.list.map(auto => {
        console.log("auto", auto)
        return (
          <div key={auto.id} className="card mb-3 shadow">
            <img src={auto.model.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{auto.model.manufacturer.name} {auto.model.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {auto.model.vin}
              </h6>
              <p className="card-text">
                Color: {auto.color}
              </p>
            </div>
            <div className="card-footer">
              <p>Year: {auto.year}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MainPage() {
  const [carColumns, setCarColumns] = useState([[], [], []]);

  const fetchData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json();
        const requests = [];
        for (let auto of data.autos) {
          const detailURL = `http://localhost:8100/api/automobiles/${auto.vin}/`
          requests.push(fetch(detailURL))
        }
        const responses = await Promise.all(requests);

        const columns = [[], [], []]

        let i=0
        for (const carResponse of responses ) {
          if (carResponse.ok) {
            const details = await carResponse.json();
            columns[i].push(details);
            i = i + 1;
            if (i>2) {
              i=0;
            }
            else {
              console.error("Car Response", carResponse);
            }
          }
        }
        setCarColumns(columns)
      }
    } catch (e) {
      console.error(e);
    }

  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-4 py-5 my-5 text-center">
      <img id="dealership-name" src={felix_lee_name} alt="dealership name"/>
      <h2 className="display-sm fw-bold">Car Showroom</h2>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Welcome to the Felix Lee Showroom!
        </p>
      </div>
      <div id="user">
        <div>
          <NavLink className="btn btn-info" to="/appointments/create" role="button">I need to service my car</NavLink>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {carColumns.map((autosList, index) => {
            return (
              <CarColumn key={index} list={autosList} />
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default MainPage;
