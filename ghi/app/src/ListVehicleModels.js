import React, { useState, useEffect } from 'react';

function ListVehicleModels(){
    const [vModels, setVmodels] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:8100/api/models/")
        if (response.ok) {
            console.log("Response", response)
            const data = await response.json();
            console.log("data", data)
            setVmodels(data.models);
            console.log("vehicle models", setVmodels)
        } else {
            console.error("Error occured while fetching vehicle model data");
        }
    }

    useEffect(()=>{
        getData()
    }, []);

    return (
            <div className="my-5 container">
                <h1>List of Vehicle Models</h1>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {vModels.map(vmodel => {
                        return(
                            <tr key={vmodel.id}>
                                <td>{vmodel.name}</td>
                                <td>{vmodel.manufacturer}</td>
                                <td><img src={vmodel.picture_url} alt="Vehicle Model" width="150"/></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
    );
}

export default ListVehicleModels;
