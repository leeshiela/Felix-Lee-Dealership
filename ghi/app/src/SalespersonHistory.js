import React, { useEffect, useState } from "react";

function SalesHistory() {
    const [sales, setSales] = useState([])

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/");
        if (response.ok) {
            const { sales } = await response.json();
            setSales(sales);
        } else {
            console.error("Error occured while fetching sales data")
        }
    }

    const fetchData = async (salesperson.id) => {
        const response = await fetch(`http://localhost:8090/api/sales/${salesperson.id}`)
        if (response.ok) {
            const { sales } = await response.json()
            setSales(sales)
        } else {
            console.error("Error in fetching sales data")
        }
    }

    const handleSalesperson= (event) => {
        const value = event.target.value;
        fetchData(value);
    }

    useEffect(()=>{
        getData()
    }, []);

    return (
        <>
        <div className="my-5 container">
            <h1>List of sales</h1>
            <select onChange={handleSalesperson}>
                <option>Choose a Salesperson</option>
                {salespeople.map(salesperson => {
                    return (
                        <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                    )
                })}

            </select>
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

export default SalesHistory;
