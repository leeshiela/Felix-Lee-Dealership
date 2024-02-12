import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

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

    useEffect(()=>{
        getData()
    }, []);

    return (
        <>
            <div className="my-5 container">
                <h1>List of Salespeople</h1>
                <NavLink className="button-right" to="/salespeople/create/"><button className="btn btn-primary">Add a salesperson</button></NavLink>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(salesperson => {
                        return(
                            <tr key={salesperson.employee_id}>
                                <td>{salesperson.employee_id}</td>
                                <td>{salesperson.first_name}</td>
                                <td>{salesperson.last_name}</td>
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
