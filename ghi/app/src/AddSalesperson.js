import React, { useState } from "react";

function AddSalesperson() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = "http://localhost:8090/api/salespeople/";

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                first_name: "",
                last_name: "",
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

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Salesperson</h1>
                        <form onSubmit={handleSubmit} id="add-salesperson-form">

                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                                <label htmlFor="first_name">First Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>

                            <button className="btn btn-primary">Add</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSalesperson;
