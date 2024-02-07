import React, {useState, useEffect} from 'react';

function DeleteDialog({hat, hats, setHats}) {
    const [delPress, setDelPress] = useState(false);

    async function deleteHat() {
        console.log(`deleting hat with reference ${hat.href}`);
        const hatUrl = `http://localhost:8090${hat.href}`;
        const options = {
            method: "delete"
        }
        const response = await fetch(hatUrl, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setDelPress(false);
            setHats(hats.filter(h => h !== hat));
        }
    }

    return (
        delPress
        ? <div className="container mx-auto">
            <div>Are you sure?</div>
            <button onClick={deleteHat} className="me-1 btn btn-danger">YES</button>
            <button onClick={() => setDelPress(false)} className="btn btn-primary">noo...</button>
          </div>
        : <button onClick={() => setDelPress(true)} className="btn btn-danger">Delete</button>
    )
}

function AppointmentList() {
    const [appmts, setAppmts] = useState([]);
    const [autos, setAutos] = useState([]);

    const fetchData = async () => {
        const appmtsUrl = 'http://localhost:8080/api/appointments/';
        const autosUrl = 'http://localhost:8100/api/automobiles/';

        const appmtsResp = await fetch(appmtsUrl);
        const autosResp = await fetch(autosUrl);

        if (appmtsResp.ok) {
            const appmtsData = await appmtsResp.json();
            setAppmts(appmtsData.appointments);
            const autosData = await autosResp.json();
            setAutos(autosData.autos);
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
    <div>
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
                <th>update</th>
                </tr>
            </thead>
            <tbody>
            {appmts.filter(appmt => appmt.status === 0).map(appmt => {
                return (
                    <tr key={appmt.id}>
                        <td>{appmt.vin}</td>
                        <td>{autos.filter(auto => auto.vin === appmt.vin)[0] && autos.filter(auto => auto.vin === appmt.vin)[0].sold ? 'Yes' : 'No'} </td>
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

export default AppointmentList;

