import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [form, setForm] = useState ({
        name: "",
        position: "",
        department: "",
    });
    const navigate = useNavigate();
    //These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    // This function will handle the submission
    async function onSubmit(e) {
        e.preventDefault();
        //when a post request is sent to the create url, we'll add a new record to the database
        const newPerson = { ...form };
            await fetch("http://localhost:3030/record/add", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            })
            .catch(error => {
                window.alert(error);
                return;
            });
            setForm({ name: "", position: "", department: ""});
            navigate("/");
    }
    //This following section will display the form that takes input from the user
    return (
        <div>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input 
                    type="text" 
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position"></label>
                    <input
                    type="text"
                    className="form-control"
                    id="position"
                    value={form.position}
                    onChange={(e) => updateForm({ position: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input 
                        type="radio" 
                        name="positionOptions"
                        id="positionGeneral"
                        value="General"
                        checked={form.department === "General"}
                        onChange={(e) => updateForm({ department: e.target.value })}
                        />
                        <label htmlFor="positionGeneral" className="form-check-label">General</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                        className="form-check-input"
                        type="radio" 
                        name="positionOptions"
                        id="positionPediatric"
                        value="Pediatric"
                        checked={form.department === "Pediatric"}
                        onChange={(e) => updateForm({ department: e.target.value })}
                        />
                        <label htmlFor="positionPediatric" className="form-check-label">Pediatric</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                        className="form-check-input"
                        type= "radio"
                        name="positionOptions"
                        id="positionRestorative"
                        value="Restorative"
                        checked={form.department === "Restorative"}
                        onChange={(e) => updateForm({ department : e.target.value })}
                        />
                        <label htmlFor="positionRestorative" className="form-check-label">Restorative</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                        className="form-check-input"
                        type= "radio"
                        name="positionOptions"
                        id="positionSurgery"
                        value="Surgery"
                        checked={form.department === "Surgery"}
                        onChange={(e) => updateForm({ department : e.target.value })}
                        />
                        <label htmlFor="positionSurgery" className="form-check-label">Surgery</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                        className="form-check-input"
                        type= "radio"
                        name="positionOptions"
                        id="positionOrthodontics"
                        value="Orthodontics"
                        checked={form.department === "Orthodonditcs"}
                        onChange={(e) => updateForm({ department : e.target.value })}
                        />
                        <label htmlFor="positionOrthodontics" className="form-check-label">Orthodontics</label>
                    </div>
                </div>
                <div className="form-group">
                    <input 
                    type="submit" 
                    value="Create person"
                    className="btn btn-primary"
                    />
                </div>
            </form> 
        </div>
    );
}