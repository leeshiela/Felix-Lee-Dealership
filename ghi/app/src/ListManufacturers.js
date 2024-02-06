import { useState, useEffect } from "react";

function ListManufacturers(){
    const [manufacturers, setManufacturers] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:8100/api/manufacturers/")
        if (response.ok) {
            const { manufacturers } = await response.json();
            setManufacturers(manufacturers);
        } else {
            console.error("Error occured while fetching salespeople data")
        }
    }

    const handleDelete = async (event) => {
        const id = event.target.dataset.id

        const fetchOptions = { method: "DELETE"}
        const request = await fetch(`http://localhost:8100/api/manufacturers/${id}/`, fetchOptions)
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
                <h1>List of Manufacturers</h1>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return(
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                                <td><button data-id={manufacturer.id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </>
    )
}

export default ListManufacturers;
