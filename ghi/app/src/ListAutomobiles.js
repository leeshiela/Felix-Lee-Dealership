import { useState, useEffect } from "react";

function ListAutomobiles() {
    const [automobiles, setAutomobiles] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8100/api/automobiles/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className="my-5 container">
            <h1>List of Automobiles</h1>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {automobiles.map(automobile => {
                    return(
                        <tr key={automobile.id}>
                            <td>{automobile.vin}</td>
                            <td>{automobile.color}</td>
                            <td>{automobile.year}</td>
                            <td>{automobile.model.name}</td>
                            <td>{automobile.model.manufacturer.name}</td>
                            <td>{automobile.sold ? "Yes" : "No"}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    );
}

export default ListAutomobiles;
