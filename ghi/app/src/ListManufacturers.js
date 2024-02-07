import { useState, useEffect } from "react";

function ListManufacturers(){
    const [manufacturers, setManufacturers] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:8100/api/manufacturers/")
        if (response.ok) {
            const { manufacturers } = await response.json();
            setManufacturers(manufacturers);
        } else {
            console.error("Error occured while fetching manufacturers data")
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
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return(
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </>
    );
}

export default ListManufacturers;
