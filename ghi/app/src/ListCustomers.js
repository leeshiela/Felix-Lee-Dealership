import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ListCustomers(){
    const [customers, setCustomers] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/customers/")
        if (response.ok) {
            const { customers } = await response.json();
            setCustomers(customers);
        } else {
            console.error("Error occured while fetching customers data")
        }
    }

    useEffect(()=>{
        getData()
    }, []);

    return (
        <>
            <div className="my-5 container">
                <h1>List of Customers</h1>
                <NavLink className="button-right" to="/manufacturers/create/"><button className="btn btn-primary">Add a manufacturer</button></NavLink>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => {
                        return(
                            <tr key={customer.id}>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.phone_number}</td>
                                <td>{customer.address}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </>
    )
}

export default ListCustomers;
