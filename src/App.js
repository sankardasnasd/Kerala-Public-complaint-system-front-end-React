import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicHome from "./pages/PublicHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Adminpage from "./pages/Admin/Adminpage";
import ManageStaff from "./pages/Admin/ManageStaff";
import ManageDepartment from "./pages/Admin/ManageDepartment";
import ViewUsers from "./pages/Admin/ViewUsers";
import ManageComplaintCategory from "./pages/Admin/ManageComplaintCategory";
import ViewComplaints from "./pages/Admin/ViewComplaints";
import UserRegistration from "./pages/User/UserRegistration";
import UserHome from "./pages/User/UserHome";
import MyProfile from "./pages/User/MyProfile";
import SubmitComplaint from "./pages/User/SubmitComplaint";
import MyComplaints from "./pages/User/MyComplaints";
import ManageNotifications from "./pages/Admin/ManageNotifications";
import StaffHome from "./pages/Staff/StaffHome";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<PublicHome />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<UserRegistration />} />

          <Route path="/admin" element={<Adminpage />} />

          <Route path="/admin/staff" element={<ManageStaff />}/>
          <Route path="/admin/department" element={<ManageDepartment />}/>
          <Route path="/admin/view_user_details" element={<ViewUsers />}/>
          <Route path="/admin/categories" element={<ManageComplaintCategory />}/>
          <Route path="/admin/complaints" element={<ViewComplaints />}/>
          <Route path="/admin/notifications" element={<ManageNotifications />}/>

          
          <Route path="/user" element={<UserHome />}/>
          <Route path="/user/profile" element={<MyProfile />}/>
          <Route path="/user/submit-complaint" element={<SubmitComplaint />}/>
          <Route path="/user/my-complaints" element={<MyComplaints />}/>


          <Route path="/staff" element={<StaffHome/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;