import React, {useState, useEffect} from 'react';

function TechList() {
    const [techs, setTechs] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechs(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
    <div className="my-5">
        <h1>List of Technicians</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
            {techs.map(tech => {
                return (
                    <tr key={tech.employee_id}>
                        <td>{tech.employee_id}</td>
                        <td>{tech.first_name}</td>
                        <td>{tech.last_name}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}

export default TechList;
