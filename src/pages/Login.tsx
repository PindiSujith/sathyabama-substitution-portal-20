import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Default faculty account for testing
const DEFAULT_FACULTY = {
  id: 1,
  name: "Test Faculty",
  username: "faculty123",
  password: "faculty123",
  timetable: Array(5).fill(Array(6).fill(""))
};

const Login = () => {
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize faculty accounts if they don't exist
  const initializeFacultyAccounts = () => {
    const existingAccounts = localStorage.getItem('facultyAccounts');
    if (!existingAccounts) {
      localStorage.setItem('facultyAccounts', JSON.stringify([DEFAULT_FACULTY]));
      console.log("Initialized default faculty account");
    }
  };

  // Call initialization when component mounts
  useState(() => {
    initializeFacultyAccounts();
  });

  const handleLogin = () => {
    if (!role || !username || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    if (role === "admin" && username === "hod1234" && password === "1234hod") {
      navigate("/admin");
    } else if (role === "faculty") {
      // Get faculty accounts from localStorage
      const facultyAccounts = JSON.parse(localStorage.getItem('facultyAccounts') || '[]');
      
      // Find matching faculty account
      const faculty = facultyAccounts.find(
        (account: { username: string; password: string; }) => 
          account.username === username && account.password === password
      );

      if (faculty) {
        // Store the logged-in faculty ID in localStorage for reference
        localStorage.setItem('currentFacultyId', faculty.id.toString());
        
        toast({
          title: "Login successful",
          description: `Welcome, ${faculty.name}!`
        });
        navigate("/faculty");
      } else {
        toast({
          variant: "destructive",
          title: "Invalid credentials",
          description: "Please check your username and password",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Invalid credentials",
        description: "Please check your username and password",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#8B0000]">
            Sathyabama Faculty Portal
          </h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <div className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-4">
            <Select onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />

            <Button
              onClick={handleLogin}
              className="w-full bg-[#8B0000] hover:bg-[#700000]"
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;