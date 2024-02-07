import React, {useState, useEffect} from 'react';

function ListAppointments() {
    const [appmts, setAppmts] = useState([]);
    const [autos, setAutos] = useState([]);

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

    async function handleClick(id, action) {
        const updateUrl = `http://localhost:8080/api/appointments/${id}/${action}/`;
        const options = {
            method: "put"
        }
        const response = await fetch(updateUrl, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setAppmts(appmts.filter(a => a.id !== id));
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
    <div className="my-5">
        <h1>List of Appointments</h1>
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
                <th>Update</th>
                </tr>
            </thead>
            <tbody>
            {appmts.filter(appmt => appmt.status === 0).map(appmt => {
                return (
                    <tr key={appmt.id}>
                        <td>{appmt.vin}</td>
                        <td>{autos.includes(appmt.vin) ? 'Yes' : 'No'} </td>
                        <td>{appmt.customer}</td>
                        <td>{new Date(appmt.date_time).toLocaleDateString()}</td>
                        <td>{new Date(appmt.date_time).toLocaleTimeString()}</td>
                        <td>{`${appmt.technician.first_name} ${appmt.technician.last_name}`}</td>
                        <td>{appmt.reason}</td>
                        <td>
                            <button onClick={e => handleClick(appmt.id, 'cancel')} className="me-1 btn btn-danger">cancel</button>
                            <button onClick={e => handleClick(appmt.id, 'finish')} className="btn btn-success">finish</button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}

export default ListAppointments;
