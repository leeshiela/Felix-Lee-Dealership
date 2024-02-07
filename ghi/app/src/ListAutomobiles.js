import { useState, useEffect } from "react";

function ListAutomobiles() {
    const [automobiles, setAutomobiles] = useState([]);

    const getData = async () => {
        const response = await fetch()
        if (response.ok) {
            const { automobiles } = await response.json();
            setAutomobiles(automobiles);
        } else {
            console.error("Error occured while fetching automobiles data")
        }
    }

    useEffect(()=>{
        getData()
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
                            <td>{automobile.model}</td>
                            <td>{automobile.manufacturer}</td>
                            <td>{automobile.sold}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    );
}

export default ListAutomobiles;
