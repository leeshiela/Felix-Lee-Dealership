import React, { useState, useEffect } from 'react';

function AddAutoMobile() {
    const [models, setModels] = useState([]);

    const [success, setSuccess] = useState(false);
    const [auto, setAuto] = useState({
        color: '',
        year: '',
        vin: '',
        model_id: ''
    });

    const [newAuto, setNewAuto] = useState({});
    const handleFieldChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setAuto({...auto, [fieldName]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(auto),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(autoUrl, fetchConfig);
        if (response.ok) {
            const newAuto = await response.json();
            setSuccess(true);
            setAuto({
                color: '',
                year: '',
                vin: '',
                model_id: ''
             });
            setNewAuto(newAuto);
        }
    }

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
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Automobile</h1>
            {success ? 
            <div className="alert alert-success d-flex align-items-center" role="alert">
                <div>
                Success: created new automobile with id {newAuto.id}
                </div>
            </div>:''}
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input value={auto.color} onChange={handleFieldChange} name="color" required type="text" id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input value={auto.year} onChange={handleFieldChange} name="year" required type="text" id="year" className="form-control"/>
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input value={auto.vin} onChange={handleFieldChange} name="vin" required type="text" id="vin" className="form-control"/>
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select value={auto.model_id} onChange={handleFieldChange} name="model_id" required id="model_id" className="form-select">
                  <option value="">Select a model for this automobile</option>
                  {models.map(model => <option key={model.id} value={model.id}>{model.name}</option>)}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AddAutoMobile;
