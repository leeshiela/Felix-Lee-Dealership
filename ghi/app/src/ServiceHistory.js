import React, {useState, useEffect} from 'react';

const statuses = ['Created', 'Finished', 'Canceled']

function ServiceHistory() {
    const [appmts, setAppmts] = useState([]);
    const [autos, setAutos] = useState([]);
    const [filterVin, setFilterVin] = useState('');

    const fetchData = async () => {
        const appmtsUrl = 'http://localhost:8080/api/appointments/';
        const autosUrl = 'http://localhost:8100/api/automobiles/';

        const appmtsResp = await fetch(appmtsUrl);
        const autosResp = await fetch(autosUrl);

        if (appmtsResp.ok && autosResp.ok) {
            const appmtsData = await appmtsResp.json();
            setAppmts(appmtsData.appointments);
            const autosData = await autosResp.json();
            setAutos(autosData.autos.filter(a => a.sold).map(a => a.vin));
        } else {
            console.log('Some error while fetching data');
        }
    }

    function handleFilterChange(e) {
        if (e.target.value === '') setFilterVin(e.target.value.toUpperCase());
    }

    function handleClick(e) {
        e.preventDefault();
        setFilterVin(e.target[0].value.toUpperCase());
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
    <div className="my-5">
        <h1>Service History</h1>
        <div className="row my-4">
            <form className="d-flex" role="search" onSubmit={handleClick}>
                <input className="form-control me-2" onChange={handleFilterChange} type="search" placeholder="Search by VIN" aria-label="Search"/>
                <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                <th>VIN</th>
                <th>is VIP?</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {appmts.filter(a => a.vin.startsWith(filterVin)).map(appmt => {
                return (
                    <tr key={appmt.id}>
                        <td>{appmt.vin}</td>
                        <td>{autos.includes(appmt.vin) ? 'Yes' : 'No'} </td>
                        <td>{appmt.customer}</td>
                        <td>{new Date(appmt.date_time).toLocaleDateString()}</td>
                        <td>{new Date(appmt.date_time).toLocaleTimeString()}</td>
                        <td>{`${appmt.technician.first_name} ${appmt.technician.last_name}`}</td>
                        <td>{appmt.reason}</td>
                        <td>{statuses[appmt.status]}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}

export default ServiceHistory;
