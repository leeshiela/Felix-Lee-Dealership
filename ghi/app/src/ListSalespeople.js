import { useState, useEffect } from "react";

function ListSalespeople(){
    const [salespeople, setSalespeople] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/salespeople/")
        if (response.ok) {
            const { salespeople } = await response.json();
            setSalespeople(salespeople);
        } else {
            console.error("Error occured while fetching salespeople data")
        }
    }

    const handleDelete = async (event) => {
        const id = event.target.dataset.employee_id

        const fetchOptions = { method: "DELETE"}
        const request = await fetch(`http://localhost:8090/api/salespeople/${id}/`, fetchOptions)
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
                <h1>List of Salespeople</h1>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(salesperson => {
                        return(
                            <tr key={salesperson.employee_id}>
                                <td>{salesperson.employee_id}</td>
                                <td>{salesperson.first_name}</td>
                                <td>{salesperson.last_name}</td>
                                <td><button data-id={salesperson.employee_id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </>
    )
}

export default ListSalespeople;
