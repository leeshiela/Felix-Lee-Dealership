import React, { useState, useEffect } from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);

    const [success, setSuccess] = useState(false);
    const [appmt, setAppmt] = useState({
        vin: '',
        customer: '',
        date: '',
        time: '',
        reason: '',
        technician: ''
    });

    const [newAppmt, setNewAppmt] = useState({});
    const handleFieldChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setAppmt({...appmt, [fieldName]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const modAppmt = appmt;
        modAppmt.date_time = `${appmt.date} ${appmt.time}`;
        delete modAppmt.date;
        delete modAppmt.time;
        const appmtUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(modAppmt),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appmtUrl, fetchConfig);
        if (response.ok) {
            const newAppmt = await response.json();
            console.log(newAppmt);
            setSuccess(true);
            setAppmt({
                vin: '',
                customer: '',
                date: '',
                time: '',
                status: '',
                reason: '',
                technician: ''
             });
            setNewAppmt(newAppmt);
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Appointment</h1>
            {success ? 
            <div className="alert alert-success d-flex align-items-center" role="alert">
                <div>
                Success: created new appointment with id {newAppmt.id}
                </div>
            </div>:''}
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input value={appmt.vin} onChange={handleFieldChange} name="vin" required type="text" id="vin" className="form-control"/>
                <label htmlFor="vin">Automobile VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input value={appmt.customer} onChange={handleFieldChange} name="customer" required type="text" id="customer" className="form-control"/>
                <label htmlFor="customer">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input value={appmt.date} onChange={handleFieldChange} name="date" required type="date" id="date" className="form-control"/>
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input value={appmt.time} onChange={handleFieldChange} name="time" type="time" id="time" className="form-control"/>
                <label htmlFor="time">Time</label>
              </div>
              <div className="form-floating mb-3">
                <input value={appmt.reason} onChange={handleFieldChange} name="reason" required type="text" id="reason" className="form-control"/>
                <label htmlFor="reason">Reason</label>
              </div>
              <div className="mb-3">
                <select value={appmt.technician} onChange={handleFieldChange} name="technician" required id="technician" className="form-select">
                  <option value="">Select a technician for this hat</option>
                  {technicians.map(technician => <option key={technician.employee_id} value={technician.employee_id}> {`${technician.first_name} ${technician.last_name}`} </option>)}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AppointmentForm;

