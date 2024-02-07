import { useState, useEffect } from "react";

function ListAutomobiles() {
    const [automobiles, setAutomobiles] = useState([]);

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
                {.map(manufacturer => {
                    return(
                        <tr key={manufacturer.id}>
                            <td>{manufacturer.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    );
}

export default ListAutomobiles;
