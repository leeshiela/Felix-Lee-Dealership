import React, {useState, useEffect} from 'react';

function ListModels() {
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
    <div className="my-5">
        <h1>List of Models</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture</th>
                </tr>
            </thead>
            <tbody>
            {models.map(m => {
                return (
                    <tr key={m.id}>
                        <td>{m.name}</td>
                        <td>{m.manufacturer.name}</td>
                        <td><img src={m.picture_url} alt={`a ${m.name} model`} width="300"/></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}

export default ListModels;
