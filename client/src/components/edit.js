import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function edit() {
    const [form, setForm] =useState({
        name: "",
        position: "",
        department: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();
        useEffect(() => {
            async function fetchData() {
                const id = params.id.toString();
                const response = await fetch(`http://localhost3030/record/${params.id.toString()}`);
                    if (!response.ok) {
                        const message = `An error has occured: ${response.statusText}`;
                        window.alert(message);
                        return;
                    }
                    const record = await response.json();
                    if(!record) {
                        window.alert(`Record with id ${id} not found`);
                        navigate("/");
                        return;
                    }
                    setForm(record);
            }
            fetchData();
            return;
        }, [params.id, navigate]);
        //These methods will update the state properties.
        function updateForm(value) {
            return setForm((prev) => {
                return { ...prev, ...value }
            });
        }
        async function onSubmit(e) {
            e.preventDefault();
            const editedPerson = {
                name: form.name,
                position: form.position,
                department: form.department,
            };
            //This will send a post request to update the data in the database
            await fetch(`http://localhost:3030/update/${params.id}`, {
                method: 'Post',
                body: JSON.stringify(editedPerson),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate("/");
        }
        //This following section will display the form that takes input from the user to update the data
        return (
            <div>
                <h3>Update Record</h3>
                <form action={onSubmit}>
                    <div className="form-group">
                    <label htmlFor="name">Name :</label>
                    <input 
                    type="text" 
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value})}
                    />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Position: </label>
                        <input 
                        type="text" 
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={ (e) => updateForm({ position: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <input 
                            type="radio" 
                            name="positionOptions"
                            id="positionGeneral"
                            value="General"
                            checked={form.department === "General"}
                            onChange={(e) => updateForm({ department: e.target.value})}
                            />
                            <label htmlFor="positionGeneral" className="form-check-label">General</label>
                        </div>
                        <div className="form-group">
                            <input 
                            type="radio" 
                            name="positionOptions"
                            id="positionPediatric"
                            value="Pediatric"
                            checked={form.department === "Pediatric"}
                            onChange={(e) => updateForm({ department: e.target.value})}
                            />
                            <label htmlFor="positionPediatric" className="form-check-label">Pediatric</label>
                        </div>
                        <div className="form-group">
                            <input 
                            type="radio" 
                            name="positionOptions"
                            id="positionRestorative"
                            value="Restorative"
                            checked={form.department === "Restorative"}
                            onChange={(e) => updateForm({ department: e.target.value})}
                            />
                            <label htmlFor="positionRestorative" className="form-check-label">Restorative</label>
                        </div>
                        <div className="form-group">
                            <input 
                            type="radio" 
                            name="positionOptions"
                            id="positionSurgery"
                            value="Surgery"
                            checked={form.department === "Surgery"}
                            onChange={(e) => updateForm({ department: e.target.value})}
                            />
                            <label htmlFor="positionSurgery" className="form-check-label">Surgery</label>
                        </div>
                        <div className="form-group">
                            <input 
                            type="radio" 
                            name="positionOptions"
                            id="positionOrthodontics"
                            value="Orthodontics"
                            checked={form.department === "Orthodontics"}
                            onChange={(e) => updateForm({ department: e.target.value})}
                            />
                            <label htmlFor="positionOrthodontics" className="form-check-label">Orthodontics</label>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <input 
                        type="submit" 
                        value="Update Record"
                        className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
}