import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.department}</td>
        <td>
            <Link className="btn btn-link" 
            to={`/edit/${props.record._id}`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}>
                    Delete
                </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);
    //This method fetched the records from the database
    useEffect(() => {
        async function getRecords() {
           const response = await fetch (`http://localhost:3030/record/`);
           if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
           }
           const records = await response.json();
           setRecords(records)
        }
        getRecords();
        return;
    }, [records.length]);
    //This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:3030/${id}`, {
            method: "DELETE"
        });
        const newRecords = records.filter((e) => el._id !== id);
        setRecords(newRecords);
    }
    //This method will map out the records on the table 
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record = {record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }
    //This section will display the table with individual records
    return (
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={{ narginTop: 20}} >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}