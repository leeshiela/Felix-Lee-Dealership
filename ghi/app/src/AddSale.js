import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddSale() {
    const [success, setSuccess] = useState(false);
    const [automobiles, setAutomobiles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customer: "",
        salesperson: "",
        automobile: "",
        price: "",
    });

    const fetchAutomobiles = async () => {
        const automobilesUrl = "http://localhost:8100/api/automobiles/";
        const response = await fetch(automobilesUrl);

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    }

    const fetchCustomers = async () => {
        const CustomersUrl = "http://localhost:8090/api/customers/";
        const response = await fetch(CustomersUrl);

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }
    const fetchSalespeople = async () => {
        const salespeopleUrl = "http://localhost:8090/api/salespeople/";
        const response = await fetch(salespeopleUrl);

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = "http://localhost:8090/api/sales/";

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setSuccess(true);
            setFormData({
                customer: "",
                salesperson: "",
                automobile: "",
                price: "",
            })
        }

        navigate("/sales/");
    }

    const handleFormChange = (event) => {
        const value = event.target.value
        const inputName = event.target.name;

        setFormData({
            ...formData, [inputName]: value
        })
    }

    useEffect(() => {
        fetchAutomobiles();
        fetchCustomers();
        fetchSalespeople();
        }, []);

    return(
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new sale</h1>
                        {success ?
                            <div className="alert alert-success d-flex align-items-center" role="alert">
                                <div>
                                Success: Created a new sale!
                                </div>
                            </div>:''
                        }
                        <form onSubmit={handleSubmit} id="create-sale-form">
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.customer} required name="customer" id="customer" className="form-select">
                                    <option value="">Choose a customer</option>
                                    {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                                    )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                                    <option value="">Choose a salesperson</option>
                                    {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.employee_id} value={salesperson.employee_id}>{salesperson.first_name} {salesperson.last_name}</option>
                                    )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.automobile} required name="automobile" id="automobile" className="form-select">
                                    <option value="">Choose an automobile VIN</option>
                                    {automobiles.filter(auto=>!auto.sold).map(automobile => {
                                    return (
                                        <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                                    )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.price} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                                <label htmlFor="price">Price</label>
                            </div>
                            <button className="btn btn-primary">Create sale</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSale;
