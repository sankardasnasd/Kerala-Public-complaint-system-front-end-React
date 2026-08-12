import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicHome from "./pages/PublicHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Adminpage from "./pages/Admin/Adminpage";
import ManageStaff from "./pages/Admin/ManageStaff";
import ManageDepartment from "./pages/Admin/ManageDepartment";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<PublicHome />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<Adminpage />} />

          <Route path="/admin/staff" element={<ManageStaff />}/>
          <Route path="/admin/department" element={<ManageDepartment />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;