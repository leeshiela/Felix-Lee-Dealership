import React, { useEffect, useState } from "react";

function AddVehicleModel() {
    const [success, setSuccess] = useState(false);
    const [manufacturers, setManufacturers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        manufacturer_id: "",
    });

    const getData = async () => {
        const manufacturersUrl = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(manufacturersUrl);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = "http://localhost:8100/api/models/";

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);
        console.log(response)
        console.log("fetch", fetchConfig)
        if (response.ok) {
            setSuccess(true);
            setFormData({
                name: "",
                picture_url: "",
                manufacturer: "",
            });
        };
    }

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;

        setFormData({
            ...formData, [inputName]: value
        });
    }

    useEffect(()=>{
        getData();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Vehicle Model</h1>
                        {success ?
                            <div className="alert alert-success d-flex align-items-center" role="alert">
                                <div>
                                Success: Created a new vehicle model!
                                </div>
                            </div>:''
                        }
                        <form onSubmit={handleSubmit} id="add-vehicleModel-form">

                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Picture Url</label>
                            </div>

                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.manufacturer} required name="manufacturer_id" id="manufacturer" className="form-select">
                                    <option value="">Manufacturer</option>
                                    {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                    )
                                    })}
                                </select>
                            </div>

                            <button className="btn btn-primary">Add</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVehicleModel;
