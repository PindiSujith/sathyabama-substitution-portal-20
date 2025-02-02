import { Card } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";

// This would typically come from a backend/database
// For now we'll use localStorage
const getFacultyAccounts = () => {
  const accounts = localStorage.getItem('facultyAccounts');
  return accounts ? JSON.parse(accounts) : [];
};

const ManageFaculty = () => {
  const navigate = useNavigate();
  const facultyAccounts = getFacultyAccounts();

  const handleEdit = (id: number) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    const accounts = getFacultyAccounts();
    const updatedAccounts = accounts.filter((account: any) => account.id !== id);
    localStorage.setItem('facultyAccounts', JSON.stringify(updatedAccounts));
    window.location.reload(); // Refresh to show updated list
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#8B0000] text-white p-4 flex items-center gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold">SATHYABAMA</h1>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-6">Manage Faculty Accounts</h2>
        
        {facultyAccounts.length === 0 ? (
          <Card className="p-6 text-center text-gray-500">
            No faculty accounts found
          </Card>
        ) : (
          <div className="space-y-4">
            {facultyAccounts.map((faculty: any) => (
              <Card key={faculty.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{faculty.name}</h3>
                    <p className="text-sm text-gray-500">ID: {faculty.username}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(faculty.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(faculty.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFaculty;