import React from "react";
//importing Route will allow the different routes of application
import { Route, Routes } from "react-router-dom";
//Importing the components that will be used in the application
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    );
};

export default App;