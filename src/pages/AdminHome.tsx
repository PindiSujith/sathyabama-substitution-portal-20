import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <BackButton />
      <div className="max-w-md mx-auto pt-16 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sathyabama-blue">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600">Manage faculty accounts</p>
        </div>

        <div className="space-y-4">
          <Button
            className="w-full bg-sathyabama-blue hover:bg-sathyabama-light"
            onClick={() => navigate("/admin/create")}
          >
            Create Faculty Account
          </Button>
          <Button
            className="w-full bg-sathyabama-blue hover:bg-sathyabama-light"
            onClick={() => navigate("/admin/manage")}
          >
            Manage Faculty Accounts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;