import React, { useState } from 'react';

function AddTechnician() {
    const [success, setSuccess] = useState(false);
    const [tech, setTech] = useState({
        employee_id: '',
        first_name: '',
        last_name: ''
    });

    const [newTech, setNewTech] = useState({});
    const handleFieldChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setTech({...tech, [fieldName]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const hatUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(tech),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newTech = await response.json();
            setSuccess(true);
            setTech({
                employee_id: '',
                first_name: '',
                last_name: ''
             });
            setNewTech(newTech);
        }
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Technician</h1>
            {success ? 
                <div>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                Success: created new technician with id {newTech.employee_id}
                </div>
            </div>:''}
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input value={tech.employee_id} onChange={handleFieldChange} name="employee_id" required type="number" id="employee_id" className="form-control"/>
                <label htmlFor="employee_id">Employee id</label>
              </div>
              <div className="form-floating mb-3">
                <input value={tech.first_name} onChange={handleFieldChange} name="first_name" required type="text" id="first_name" className="form-control"/>
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={tech.last_name} onChange={handleFieldChange} name="last_name" required type="text" id="last_name" className="form-control"/>
                <label htmlFor="last_name">Last Name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AddTechnician;

