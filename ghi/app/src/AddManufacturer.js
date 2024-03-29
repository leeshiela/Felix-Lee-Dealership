import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddManufacturer() {
    const [success, setSuccess] = useState(false);
    const [manufacturerName, setManufacturerName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = manufacturerName;
        const url = "http://localhost:8100/api/manufacturers/";

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setSuccess(true);
            setManufacturerName("");
        };
        navigate("/manufacturers/");
    }

    const handleFormChange = (event) => {
        const value = event.target.value;
        setManufacturerName(value);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Manufacturer</h1>
                        {success ?
                            <div className="alert alert-success d-flex align-items-center" role="alert">
                                <div>
                                Success: Created a new Manufacturer!
                                </div>
                            </div>:''
                        }
                        <form onSubmit={handleSubmit} id="add-manufacturer-form">

                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={manufacturerName} placeholder="Manufacturer Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Manufacturer Name</label>
                            </div>

                            <button className="btn btn-primary">Add</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddManufacturer;
