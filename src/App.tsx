import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import CreateFaculty from "./pages/CreateFaculty";
import ManageFaculty from "./pages/ManageFaculty";
import EditFaculty from "./pages/EditFaculty";
import FacultyHome from "./pages/FacultyHome";
import LeaveApplication from "./pages/LeaveApplication";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/create" element={<CreateFaculty />} />
          <Route path="/admin/manage" element={<ManageFaculty />} />
          <Route path="/admin/edit/:id" element={<EditFaculty />} />
          <Route path="/faculty" element={<FacultyHome />} />
          <Route path="/faculty/leave" element={<LeaveApplication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;