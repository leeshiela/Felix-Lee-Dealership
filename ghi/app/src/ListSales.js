import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ListSales() {
    const [sales, setSales] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/");
        if (response.ok) {
            const { sales } = await response.json();
            setSales(sales);
        } else {
            console.error("Error occured while fetching sales data")
        }
    }

    useEffect(()=>{
        getData()
    }, []);

    return (
        <>
        <div className="my-5 container">
            <h1>List of sales</h1>
            <NavLink className="button-right" to="/sales/create/"><button className="btn btn-primary">Add a sale</button></NavLink>
        </div>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>Salesperson Employee ID</th>
                    <th>Salesperson Name</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale=> {
                    return (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.salesperson.first_name} {sale.last_name}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
    );
}

export default ListSales;
