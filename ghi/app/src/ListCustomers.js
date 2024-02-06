import { useState, useEffect } from "react";

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

    const handleDelete = async (event) => {
        const id = event.target.dataset.id

        const fetchOptions = { method: "DELETE"}
        const request = await fetch(`http://localhost:8090/api/customers/${id}/`, fetchOptions)
        if (request.ok) {
            getData()
        }
    }

    useEffect(()=>{
        getData()
    }, []);

    return (
        <>
            <div className="my-5 container">
                <h1>List of Customers</h1>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Delete</th>
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
                                <td><button data-id={customer.id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
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