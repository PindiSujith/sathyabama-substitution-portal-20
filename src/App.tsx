import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import FacultyHome from "./pages/FacultyHome";
import CreateFaculty from "./pages/CreateFaculty";
import EditFaculty from "./pages/EditFaculty";
import ManageFaculty from "./pages/ManageFaculty";
import LeaveApplication from "./pages/LeaveApplication";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/faculty" element={<FacultyHome />} />
        <Route path="/create-faculty" element={<CreateFaculty />} />
        <Route path="/edit-faculty/:id" element={<EditFaculty />} />
        <Route path="/manage-faculty" element={<ManageFaculty />} />
        <Route path="/leave-application" element={<LeaveApplication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;